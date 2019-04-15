package shops.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import shops.entities.User;

public interface UserRepository extends JpaRepository<User,Long>{
	public User findByLogin(String login);

}
