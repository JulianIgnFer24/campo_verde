package ar.edu.uncuyo.repository;

import ar.edu.uncuyo.model.FacturaCliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacturaClienteRepository extends JpaRepository<FacturaCliente, Long> {
}