package ar.edu.uncuyo.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.*;
import java.io.Serializable;

@Entity
@Table(name = "empleado")
public class Empleado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "dni_empleado", nullable = false)
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

    // Campo mapeado a la BD
    @Column(name = "dni_supervisor")
    private Long dniSupervisor;

    // Relación con Supervisor (solo para mostrar, no para guardar)
    @Access(AccessType.PROPERTY)
    @ManyToOne
    @JoinColumn(name = "dni_supervisor", referencedColumnName = "dni_empleado", insertable = false, updatable = false)
    private Empleado supervisor;

    // Getter para JSON
    @JsonProperty("dniSupervisor")
    @Transient
    public Long getDniSupervisorJSON() {
        return supervisor != null ? supervisor.getDniEmpleado() : null;
    }

    // Setter para JSON – asigna el DNI del supervisor
    @JsonProperty("dniSupervisor")
    public void parseDniSupervisor(@JsonProperty("dniSupervisor") Long dniSupervisor) {
        this.dniSupervisor = dniSupervisor;
    }

    // Getter/setter para JPA – Usa este campo para guardar
    public Long getDniSupervisor() {
        return dniSupervisor;
    }

    public void setDniSupervisor(Long dniSupervisor) {
        this.dniSupervisor = dniSupervisor;
    }

    // Getters y Setters normales
    public Long getDniEmpleado() { return dniEmpleado; }
    public void setDniEmpleado(Long dniEmpleado) { this.dniEmpleado = dniEmpleado; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public Double getSueldo() { return sueldo; }
    public void setSueldo(Double sueldo) { this.sueldo = sueldo; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public Empleado getSupervisor() { return supervisor; }
    public void setSupervisor(Empleado supervisor) { this.supervisor = supervisor; }

    // Antes de guardar o actualizar
    @PrePersist
    @PreUpdate
    public void beforeSave() {
        if (dniSupervisor != null) {
            Empleado s = new Empleado();
            s.setDniEmpleado(dniSupervisor);
            this.supervisor = s;
        } else {
            this.supervisor = null;
        }
    }

    @Override
    public String toString() {
        return "Empleado{" +
                "dniEmpleado=" + dniEmpleado +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", tipo='" + tipo + '\'' +
                ", sueldo=" + sueldo +
                ", dirección='" + direccion + '\'' +
                ", supervisor=" + (supervisor != null ? supervisor.dniEmpleado : "Ninguno") +
                '}';
    }
}