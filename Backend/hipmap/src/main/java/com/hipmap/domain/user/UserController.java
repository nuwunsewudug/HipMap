package com.hipmap.domain.user;

import com.hipmap.domain.jwt.dto.JwtUserInfo;
import com.hipmap.domain.user.dto.request.UserEditRequest;
import com.hipmap.domain.user.dto.request.UserLoginRequest;
import com.hipmap.domain.user.dto.request.UserRegistRequest;
import com.hipmap.domain.user.dto.response.UserIdDupCheckResponse;
import com.hipmap.domain.user.dto.response.UserLoginResponse;
import com.hipmap.domain.user.dto.response.UserReadResponse;
import com.hipmap.global.util.JwtUtil;
import com.hipmap.global.util.RedisUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Api(tags = {"회원"})
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final RedisUtil redisUtil;

    @PostMapping("/regist")
    @ApiOperation(value = "회원가입", notes = "입력받은 회원정보를 이용해 가입 진행")
    @ApiResponses({
            @ApiResponse(code = 200, message = "요청 성공"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    public ResponseEntity<?> regist(@RequestBody UserRegistRequest userInfo){
        userService.regist(userInfo);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "입력받은 회원정보를 이용해 로그인 진행")
    @ApiResponses({
            @ApiResponse(code = 200, message = "요청 성공"),
            @ApiResponse(code = 204, message = "로그인 정보 없음"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    public UserLoginResponse login(@RequestBody UserLoginRequest user) {
        Map<String, String> map = new HashMap<>();
        final JwtUserInfo userInfo = userService.login(user.getUsername(), user.getPassword());
        final String token = jwtUtil.generateToken(userInfo.toEntity());
        final String refreshJwt = jwtUtil.generateRefreshToken(userInfo.toEntity());
        redisUtil.setDataExpire(refreshJwt, userInfo.getUsername(), JwtUtil.REFRESH_TOKEN_VALIDATION_SECOND);
        map.put(JwtUtil.ACCESS_TOKEN_NAME, token);
        map.put(JwtUtil.REFRESH_TOKEN_NAME, refreshJwt);

        return UserLoginResponse.builder()
                .tokens(map)
                .expireMilliSec(JwtUtil.TOKEN_VALIDATION_SECOND)
                .build();
    }

    @GetMapping("/{username}/exists")
    @ApiOperation(value = "아이디 중복확인", notes = "입력받은 ID로 가입이 가능한지 체크")
    @ApiResponses({
            @ApiResponse(code = 200, message = "요청 성공"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    public UserIdDupCheckResponse idCheck(@PathVariable String username) {
        return UserIdDupCheckResponse.builder().result(userService.idCheck(username)).build();
    }

    @PutMapping("/edit")
    @ApiOperation(value = "유저 정보 수정", notes = "입력받은 정보로 유저 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "요청 성공"),
            @ApiResponse(code = 401, message = "유저 정보 없음 (access token)"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    public ResponseEntity<?> update(@RequestBody UserEditRequest userInfo, HttpServletRequest request) {
        userService.update(jwtUtil.getUserInfo(request.getHeader("accessToken")).getId(),
                userInfo.getNickname(), userInfo.getLabel(), userInfo.isFollowPrivate());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}")
    @ApiOperation(value = "유저 정보 조회", notes = "입력받은 유저 고유 ID(Long)로 유저 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "요청 성공"),
            @ApiResponse(code = 204, message = "유저 정보 없음(존재하지 않는 유저)"),
            @ApiResponse(code = 401, message = "유저 정보 없음 (access token)"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    public UserReadResponse readInfo(@PathVariable Long userId) {
        return userService.readInfo(userId);
    }
}
