package com.tap.email.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String verificationCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("kps10011@naver.com"); // 발신자 주소 설정
        message.setTo(to);
        message.setSubject("Email Verification Code");
        message.setText("Your verification code is: " + verificationCode);
        mailSender.send(message);
    }
    public void sendOrderConfirmationEmail(String to, Map<String, Object> orderData) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom("kps10011@naver.com"); // 발신자 주소 설정
        helper.setTo(to);
        helper.setSubject("주문 확인서"); // 이메일 제목

        // HTML 형식의 이메일 내용 생성 (상품 번호, 날짜, 시간, 좌석 정보 포함)
        StringBuilder emailContent = new StringBuilder();
        emailContent.append("<html>");
        emailContent.append("<body>");
        emailContent.append("<h2>주문해 주셔서 감사합니다!</h2>");
        emailContent.append("<p>주문 상세 정보:</p>");
        emailContent.append("<ul>");
        emailContent.append("<li><strong>상품 번호 (Seq):</strong> ").append(orderData.get("seq")).append("</li>");
        emailContent.append("<li><strong>날짜:</strong> ").append(orderData.get("date")).append("</li>");
        emailContent.append("<li><strong>시간:</strong> ").append(orderData.get("time")).append("</li>");
        emailContent.append("<li><strong>좌석 구역:</strong> ").append(orderData.get("storageSection")).append("</li>");

        // 선택된 좌석 정보
        List<Map<String, Object>> storageSeats = (List<Map<String, Object>>) orderData.get("storageSeats");
        emailContent.append("<li><strong>선택된 좌석:</strong> ");
        for (Map<String, Object> seat : storageSeats) {
            String grade = (String) seat.get("grade");
            String row = seat.get("row").toString();
            String col = seat.get("col").toString();
            
            emailContent.append("등급: ").append(grade)
                        .append(", 행: ").append(row)
                        .append(", 열: ").append(col)
                        .append("\n");  // 각 좌석 정보는 줄바꿈하여 표시
        }
        emailContent.append("</li>");
        emailContent.append("</ul>");

        emailContent.append("<p><strong>총 가격:</strong> ").append(orderData.get("totalPrice")).append(" KRW</p>");
        emailContent.append("</body>");
        emailContent.append("</html>");

        // 이메일 본문에 추가 (HTML 내용)
        helper.setText(emailContent.toString(), true); // true는 HTML을 의미

        // 이메일 발송
        mailSender.send(message);
    }

}
