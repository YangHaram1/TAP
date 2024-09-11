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

	private UserDetails user;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		clients.add(session);
		Authentication authentication = ((SecurityContext) session.getAttributes().get("SPRING_SECURITY_CONTEXT"))
				.getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			String userId = authentication.getName(); // 인증된 사용자 ID
			System.out.println("웹소켓 연결 : user ID: " + userId);
			user = mserv.loadUserByUsername(userId);
		} else {
			System.out.println("웹소켓 연결 실패 : User is not authenticated");
		}
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String sender = user.getUsername();
		System.out.println(sender);
		List<GroupMemberDTO> list = new ArrayList<>();
		boolean jsonValidate = validateJson(message.getPayload());
		int groupSeq = 0;
		String messages=null;
		if (jsonValidate) {
			Type mapType = new TypeToken<Map<String, Object>>() {}.getType();
			String jsonString = message.getPayload();
			Map<String, Object> map = gson.fromJson(jsonString, mapType);
			
			Object chatSeq=map.get("chatSeq");
		    // Double인 경우 Integer로 변환
		    if (chatSeq instanceof Double) {
		        groupSeq = ((Double) chatSeq).intValue();
		    } else if (chatSeq instanceof Integer) {
		        groupSeq = (Integer) chatSeq;       
		    }
			messages=(String)map.get("message");
			list=memberService.membersByGroupSeq(groupSeq);
			
			boolean listCheck = false;
			for (GroupMemberDTO dto : list) { // 만약 방나갓는데 채팅 보낼라고하면 막기
				if (dto.getMember_id().equals(sender)) {
					listCheck = true;
					break;
				}
			}
			
			if (listCheck) {
				ChatDTO dto = new ChatDTO(0, sender, messages, null, groupSeq, 0);
				dto = chatService.insert(dto);
				// ChatImgDTO sendDTO =chatService.selectOne(dto.getSeq());
				String json = gson.toJson(dto);
				broadcastMessage(json, list);
//				System.out.println(list.get(1).getMember_id());
				System.out.println("메세지보냄");
			}
		}
		
		

		
		
	
		
		
		

//		if (message.getPayload().equals("chatController")) {
//			broadcastMessage("chatController", list);
//		}
//		

//			System.out.println("파일업로드 웹소켓");
//			String jsonString = message.getPayload();
//			Type mapType = new TypeToken<Map<String, Object>>() {
//			}.getType();
//			Map<String, Object> map = gson.fromJson(jsonString, mapType);
//			String fileMessage = map.get("oriname") + "*" + map.get("sysname") + "*" + map.get("code");
//			ChatDTO dto = null;
//			if (map.get("dto") != null) {
//				// dto 필드 자체가 LinkedTreeMap으로 변환되어 있으므로, 이를 다시 JSON 문자열로 변환한 후, ChatDTO로 변환
//				String dtoJson = gson.toJson(map.get("dto"));
//				dto = gson.fromJson(dtoJson, ChatDTO.class);
//			}
//			String json = gson.toJson(dto);
//			broadcastMessage(json, list);

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

	private void broadcastMessage(String message, List<GroupMemberDTO> list) {// 그룹별 메세지 전송 로직
		synchronized (clients) {
			for (WebSocketSession client : clients) {
				try {
					String member_id = user.getUsername();
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
