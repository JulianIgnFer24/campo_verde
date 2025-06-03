package ar.edu.uncuyo.controller;

import ar.edu.uncuyo.model.Empleado;
import ar.edu.uncuyo.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
        if (empleado.getDniSupervisor() != null) {
            Optional<Empleado> supervisorOpt = empleadoRepository.findById(empleado.getDniSupervisor());

            if (supervisorOpt.isEmpty()) {
                throw new RuntimeException("No se encontró un supervisor con ese DNI");
            }

            Empleado supervisor = supervisorOpt.get();

            // ✅ Validación de tipo 'Gerente' eliminada
            empleado.setDniSupervisor(supervisor.getDniEmpleado());
        } else {
            empleado.setDniSupervisor(null);
            empleado.setSupervisor(null);
        }

        return empleadoRepository.saveAndFlush(empleado);
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public Empleado getById(@PathVariable Long id) {
        return empleadoRepository.findById(id).orElseThrow();
    }

    // Modificar
    @PutMapping("/{id}")
    public Empleado update(@PathVariable Long id, @RequestBody Empleado empleadoActualizado) {
        Empleado empleado = empleadoRepository.findById(id).orElseThrow();

        // Actualizar campos normales
        empleado.setNombre(empleadoActualizado.getNombre());
        empleado.setApellido(empleadoActualizado.getApellido());
        empleado.setTipo(empleadoActualizado.getTipo());
        empleado.setSueldo(empleadoActualizado.getSueldo());
        empleado.setDireccion(empleadoActualizado.getDireccion());

        // Manejar supervisor
        if (empleadoActualizado.getDniSupervisor() != null && !empleadoActualizado.getDniSupervisor().equals(id)) {
            Optional<Empleado> supervisorOpt = empleadoRepository.findById(empleadoActualizado.getDniSupervisor());

            if (supervisorOpt.isEmpty()) {
                throw new RuntimeException("No se encontró un supervisor con ese DNI");
            }

            Empleado supervisor = supervisorOpt.get();

            empleado.setDniSupervisor(supervisor.getDniEmpleado());
        } else {
            empleado.setDniSupervisor(null);
            empleado.setSupervisor(null);
        }

        return empleadoRepository.saveAndFlush(empleado);
    }

    // Baja
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        empleadoRepository.deleteById(id);
    }
}