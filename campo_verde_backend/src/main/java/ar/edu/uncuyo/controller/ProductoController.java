package ar.edu.uncuyo.controller;

import ar.edu.uncuyo.model.Producto;
import ar.edu.uncuyo.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    // Listar todos
    @GetMapping
    public List<Producto> getAll() {
        return productoRepository.findAll();
    }

    // Alta de producto
    @PostMapping
    public Producto create(@RequestBody Producto producto) {
        System.out.println("Recibido - Alta de producto:");
        System.out.println(producto);

        if (producto.getCod() == null || producto.getCod() <= 0) {
            throw new RuntimeException("El código es obligatorio");
        }

        return productoRepository.saveAndFlush(producto);
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public Producto getById(@PathVariable Long id) {
        return productoRepository.findById(id).orElseThrow();
    }

    // Modificar producto
    @PutMapping("/{id}")
    public Producto update(@PathVariable Long id, @RequestBody Producto productoActualizado) {
        Producto producto = productoRepository.findById(id).orElseThrow();

        producto.setDescripcion(productoActualizado.getDescripcion());
        producto.setPrecio(productoActualizado.getPrecio());
        producto.setCantidad(productoActualizado.getCantidad());

        return productoRepository.save(producto);
    }

    // Borrar producto
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productoRepository.deleteById(id);
    }
}