package com.hipmap.domain.jwt;

import com.hipmap.domain.jwt.dto.response.ReIssueResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/jwt")
@Api(tags = {"JWT Token"})
public class JwtController {
    private final JwtService jwtService;

    @PostMapping("/re-issue")
    @ApiOperation(value = "Token 재발급", notes = "기존 refreshToken을 이용해 accessToken과 refreshToken을 재발급 받는 요청")
    @ApiResponses({
            @ApiResponse(code = 200, message = "요청 성공"),
            @ApiResponse(code = 401, message = "만료된 refreshToken 전송"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    public ReIssueResponse reIssue(HttpServletRequest request) {
        String refreshToken = request.getHeader("refreshToken");
        return jwtService.reIssue(refreshToken);
    }
}
