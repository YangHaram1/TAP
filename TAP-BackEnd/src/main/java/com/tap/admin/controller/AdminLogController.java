package com.tap.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;
import com.tap.admin.dto.AdminLogDTO;
import com.tap.admin.dto.AdminLogSearchDTO;
import com.tap.admin.services.AdminLogService;

@RestController
@RequestMapping("/admin/logs")
public class AdminLogController {

    @Autowired
    private AdminLogService adminLogService;
    
    @GetMapping
    public ResponseEntity<PageInfo<AdminLogDTO>> getAllLog(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(adminLogService.getAllLog(page, size));
    }
    
    @GetMapping("/search")
    public ResponseEntity<PageInfo<AdminLogDTO>> getSearchLog(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String member_id,
            @RequestParam(required = false) String log_status,
            @RequestParam(required = false) String specific_start_date,
            @RequestParam(required = false) String specific_end_date) {
        
        AdminLogSearchDTO searchDTO = new AdminLogSearchDTO();
        searchDTO.setMemberId(member_id);
        searchDTO.setName(name);
        searchDTO.setLogStatus(log_status);
        searchDTO.setSpecificStartDate(specific_start_date);
        searchDTO.setSpecificEndDate(specific_end_date);
        
        return ResponseEntity.ok(adminLogService.getSearchLog(searchDTO, page, size));
    }
}