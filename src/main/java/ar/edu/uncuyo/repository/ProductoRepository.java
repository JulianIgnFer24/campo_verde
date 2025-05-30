package ar.edu.uncuyo.repository;

import ar.edu.uncuyo.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}