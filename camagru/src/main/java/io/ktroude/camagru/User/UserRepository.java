package io.ktroude.camagru.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<AppUser, Integer>{
    Optional<AppUser> findByUsername(String username);
    List<AppUser> findAll();

}
