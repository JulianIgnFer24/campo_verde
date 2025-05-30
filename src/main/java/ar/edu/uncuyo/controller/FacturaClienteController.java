package ar.edu.uncuyo.controller;

import ar.edu.uncuyo.model.FacturaCliente;
import ar.edu.uncuyo.repository.FacturaClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facturas")
@CrossOrigin(origins = "http://localhost:4200")
public class FacturaClienteController {

    @Autowired
    private FacturaClienteRepository facturaClienteRepository;

    @GetMapping
    public List<FacturaCliente> getAll() {
        return facturaClienteRepository.findAll();
    }

    @PostMapping
    public FacturaCliente create(@RequestBody FacturaCliente factura) {
        return facturaClienteRepository.save(factura);
    }

    @GetMapping("/{id}")
    public FacturaCliente getById(@PathVariable Long id) {
        return facturaClienteRepository.findById(id).orElseThrow();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        facturaClienteRepository.deleteById(id);
    }
}