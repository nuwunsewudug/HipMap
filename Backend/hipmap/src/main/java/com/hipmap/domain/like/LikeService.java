package com.hipmap.domain.like;

import com.hipmap.domain.like.dto.LikeSaveRequestDto;
import com.hipmap.domain.like.dto.LikeUpdateRequestDto;
import com.hipmap.domain.like.dto.LikeUpdateResponseDto;
import com.hipmap.domain.shorts.response.ShortsIdAndLikeCntProjectionInterface;

import java.util.List;

public interface LikeService {
    Long create(LikeSaveRequestDto dto);

    LikeUpdateResponseDto update(Long userId, LikeUpdateRequestDto dto);

    Long delete(Long userId, Long shortsId);

    List<ShortsIdAndLikeCntProjectionInterface> shortsTop5ByCountLike();

}
