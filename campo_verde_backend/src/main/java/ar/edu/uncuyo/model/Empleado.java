package ar.edu.uncuyo.model;

import java.io.Serializable;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "empleado")
public class Empleado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dni_empleado")
    private Long dniEmpleado;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "sueldo")
    private Double sueldo;

    @Column(name = "direccion")
    private String direccion;

    // Relación uno-a-uno con Supervisor (self-referencia)
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "dni_supervisor")
    private Empleado supervisor;

    public Empleado() {
        // Constructor vacío requerido por JPA
    }

    public Empleado(Long dniEmpleado, String nombre, String apellido, String tipo, Double sueldo, String direccion) {
        this.dniEmpleado = dniEmpleado;
        this.nombre = nombre;
        this.apellido = apellido;
        this.tipo = tipo;
        this.sueldo = sueldo;
        this.direccion = direccion;
    }

    // Getters y Setters
    public Long getDniEmpleado() {
        return dniEmpleado;
    }

    public void setDniEmpleado(Long dniEmpleado) {
        this.dniEmpleado = dniEmpleado;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Double getSueldo() {
        return sueldo;
    }

    public void setSueldo(Double sueldo) {
        this.sueldo = sueldo;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Empleado getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(Empleado supervisor) {
        this.supervisor = supervisor;
    }

    @Override
    public String toString() {
        return "Empleado{" +
                "dniEmpleado=" + dniEmpleado +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", tipo='" + tipo + '\'' +
                ", sueldo=" + sueldo +
                ", direccion='" + direccion + '\'' +
                ", supervisor=" + supervisor +
                '}';
    }
}