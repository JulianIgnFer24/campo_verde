package ar.edu.uncuyo.controller;

import ar.edu.uncuyo.model.Empleado;
import ar.edu.uncuyo.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empleados")
public class EmpleadoController {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    // Listar todos
    @GetMapping
    public List<Empleado> getAll() {
        return empleadoRepository.findAll();
    }

    // Alta
    @PostMapping
    public Empleado crear(@RequestBody Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public Empleado getById(@PathVariable Long id) {
        return empleadoRepository.findById(id).orElseThrow();
    }

    // Modificar
    @PutMapping("/{id}")
    public Empleado actualizar(@PathVariable Long id, @RequestBody Empleado empleadoActualizado) {
        Empleado empleado = empleadoRepository.findById(id).orElseThrow();

        empleado.setNombre(empleadoActualizado.getNombre());
        empleado.setApellido(empleadoActualizado.getApellido());

        return empleadoRepository.save(empleado);
    }

    // Baja
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        empleadoRepository.deleteById(id);
    }
}