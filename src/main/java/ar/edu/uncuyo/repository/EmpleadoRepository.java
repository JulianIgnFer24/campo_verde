package ar.edu.uncuyo.repository;

import ar.edu.uncuyo.model.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
}