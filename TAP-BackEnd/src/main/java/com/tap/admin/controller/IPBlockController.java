package com.tap.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import com.github.pagehelper.PageInfo;
import com.tap.admin.dto.IPBlockDTO;
import com.tap.admin.services.IPBlockService;

@RestController
@RequestMapping("/admin/ip-block")
public class IPBlockController {

    @Autowired
    private IPBlockService ipBlockService;

    @GetMapping("/list")
    public ResponseEntity<PageInfo<IPBlockDTO>> getBlockedIPs(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageInfo<IPBlockDTO> blockedIPs = ipBlockService.getBlockedIPs(page, size);
        // null 값 처리
        for (IPBlockDTO ip : blockedIPs.getList()) {
            if (ip.getReason() == null) {
                ip.setReason("사유 없음");
            }
        }
        return ResponseEntity.ok(blockedIPs);
    }

    @PostMapping("/block")
    public ResponseEntity<Void> blockIP(@RequestParam String ip, @RequestParam String reason) {
        ipBlockService.blockIP(ip, reason);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/unblock")
    public ResponseEntity<Void> unblockIP(@RequestParam String ip) {
        ipBlockService.unblockIP(ip);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> isIPBlocked(@RequestParam String ip) {
        return ResponseEntity.ok(ipBlockService.isIPBlocked(ip));
    }
}