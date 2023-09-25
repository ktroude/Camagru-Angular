package io.ktroude.camagru;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import io.ktroude.camagru.Role.Role;
import io.ktroude.camagru.Role.RoleRepository;
import io.ktroude.camagru.User.AppUser;
import io.ktroude.camagru.User.UserRepository;

@SpringBootApplication
public class CamagruApplication {

	public static void main(String[] args) {
		SpringApplication.run(CamagruApplication.class, args);
	}


	// Pour ajouter un admin si la db redemarre en mode erase all
	@Bean
	CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder){
		return args -> {
			if (roleRepository.findByAuthority("ADMIN").isPresent())
				return ;
			Role adminRole = roleRepository.save(new Role("ADMIN"));
			roleRepository.save(new Role("USER"));

			Set<Role> roles = new HashSet<>();
			roles.add(adminRole);

			AppUser admin = new AppUser(1, "admin", "ktroude@gmail.com", passwordEncoder.encode("password"), roles);
			userRepository.save(admin);
		};
	}

}
