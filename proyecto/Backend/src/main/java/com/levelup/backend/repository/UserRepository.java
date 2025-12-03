package com.levelup.backend.repository;

import com.levelup.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    // Método mágico: Spring crea la consulta automáticamente por el nombre
    Optional<User> findByEmail(String email);
    
    // Para verificar si un email ya existe al registrarse
    Boolean existsByEmail(String email);
}