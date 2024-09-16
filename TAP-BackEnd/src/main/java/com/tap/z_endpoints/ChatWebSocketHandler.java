package com.tap.z_endpoints;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;
import com.tap.chat.dto.ChatDTO;
import com.tap.chat.service.ChatService;
import com.tap.groupmember.dto.GroupMemberDTO;
import com.tap.groupmember.service.GroupMemberSerivce;
import com.tap.members.service.MembersService;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.Map;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

	private final Set<WebSocketSession> clients = Collections.synchronizedSet(new HashSet<>());
	private final Gson gson = new Gson();

	@Autowired
	private ChatService chatService;
	@Autowired
	private GroupMemberSerivce memberService;
	@Autowired
	private MembersService mserv;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		clients.add(session);
		Authentication authentication = ((SecurityContext) session.getAttributes().get("SPRING_SECURITY_CONTEXT"))
				.getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			String userId = authentication.getName(); // 인증된 사용자 ID
			System.out.println("웹소켓 연결 : user ID: " + userId);
			UserDetails user = mserv.loadUserByUsername(userId);
		} else {
			System.out.println("웹소켓 연결 실패 : User is not authenticated");
		}
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		Authentication authentication = ((SecurityContext) session.getAttributes().get("SPRING_SECURITY_CONTEXT"))
				.getAuthentication();
		String sender =authentication.getName();
		System.out.println(sender);
		List<GroupMemberDTO> list = new ArrayList<>();
		String jsonString = message.getPayload();
		boolean jsonValidate = validateJson(jsonString);
		int groupSeq = 0;
		int uploadSeq=0;
		String messages = null;
		
		if (jsonValidate) {
			Type mapType = new TypeToken<Map<String, Object>>() {
			}.getType();
			
			Map<String, Object> map = gson.fromJson(jsonString, mapType);

			Object checkUploadSeq = map.get("upload_seq");
			
			// Double인 경우 Integer로 변환
			if (checkUploadSeq instanceof Double) {
				uploadSeq = ((Double) checkUploadSeq).intValue();
			} else if (checkUploadSeq instanceof Integer) {
				uploadSeq = (Integer) checkUploadSeq;
			}
			Object chatSeq = map.get("group_seq");
			// Double인 경우 Integer로 변환
			if (chatSeq instanceof Double) {
				groupSeq = ((Double) chatSeq).intValue();
			} else if (chatSeq instanceof Integer) {
				groupSeq = (Integer) chatSeq;
			}
			list = memberService.membersByGroupSeq(groupSeq);

			boolean listCheck = false;
			for (GroupMemberDTO dto : list) { // 만약 방나갓는데 채팅 보낼라고하면 막기
				if (dto.getMember_id().equals(sender)) {
					listCheck = true;
					break;
				}
			}
			
			if (listCheck) {
				if (uploadSeq == 0) {
					messages = (String) map.get("message");
					ChatDTO dto = new ChatDTO(0, sender, messages, null, groupSeq, 0);
					dto = chatService.insert(dto);
					String json = gson.toJson(dto);
					broadcastMessage(json, list,sender);
					
					System.out.println("메세지보냄");

				} else {
					broadcastMessage(jsonString, list,sender);
					System.out.println("파일업로드함");
				}
			}

		}

	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		clients.remove(session);
	}

	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		try {
			clients.remove(session);
		} catch (Exception e) {
			// 예외 처리
			exception.printStackTrace();
		}

	}

	private void broadcastMessage(String message, List<GroupMemberDTO> list,String username) {// 그룹별 메세지 전송 로직
		synchronized (clients) {
			for (WebSocketSession client : clients) {
				try {
					String member_id = username;
					for (GroupMemberDTO dto : list) {
						if (dto.getMember_id().equals(member_id)) {
							client.sendMessage(new TextMessage(message));
							break;
						}
					}
				} catch (Exception e) {
					System.out.println("Error sending message: " + e.getMessage());
				}
			}
		}
	}

	private boolean validateJson(String jsonString) {
		try {
			// JSON 문자열을 JsonElement로 파싱하여 유효성 검사
			JsonElement jsonElement = JsonParser.parseString(jsonString);

			// JSON 파싱 성공
			return true;
		} catch (JsonSyntaxException e) {
			// JSON 파싱 중 오류 발생 (유효하지 않은 JSON)
			return false;

		} catch (Exception e) {
			// 기타 예외 처리
			return false;
		}
	}
}
