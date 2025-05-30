package ar.edu.uncuyo.model;

import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "factura_cliente")
public class FacturaCliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "numero_factura")
    private Long numeroFactura;

    @Column(name = "fecha")
    private Date fecha;

    // Relación uno-a-muchos con Empleado
    @ManyToOne
    @JoinColumn(name = "dni_empleado")
    private Empleado empleado;

    // Relación uno-a-muchos con Cliente
    @ManyToOne
    @JoinColumn(name = "dni_cliente")
    private Cliente cliente;

    public FacturaCliente() {
        // Constructor vacío requerido por JPA
    }

    public FacturaCliente(Long numeroFactura, Date fecha, Empleado empleado, Cliente cliente) {
        this.numeroFactura = numeroFactura;
        this.fecha = fecha;
        this.empleado = empleado;
        this.cliente = cliente;
    }

    // Getters y Setters
    public Long getNumeroFactura() {
        return numeroFactura;
    }

    public void setNumeroFactura(Long numeroFactura) {
        this.numeroFactura = numeroFactura;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    @Override
    public String toString() {
        return "FacturaCliente{" +
                "numeroFactura=" + numeroFactura +
                ", fecha=" + fecha +
                ", empleado=" + empleado +
                ", cliente=" + cliente +
                '}';
    }
}