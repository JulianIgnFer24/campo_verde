package ar.edu.uncuyo.repository;

import ar.edu.uncuyo.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}