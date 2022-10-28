package com.hipmap.domain.follow;

import com.hipmap.domain.user.UserEntity;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<FollowEntity, Long> {
    List<FollowEntity> findAllByUser(UserEntity user);

    List<FollowEntity> findAllByFollowingUser(UserEntity followingUser);

    Optional<FollowEntity> findByUserAndFollowingUser(UserEntity user, UserEntity followingUser);

    // DeleteByFollowId
    void deleteByFollowId(Long followId);

    // follower count
    Long countByFollowingUser(UserEntity followingUser);


    @Query("SELECT f.followingUser.username FROM FollowEntity f WHERE f.followingUser.username LIKE %:keyword% AND f.user.username = :username")
    List<String> findAllSearch(@Param("keyword") String keyword, @Param("username") String username);

    Long countByUser(UserEntity userEntity);
}