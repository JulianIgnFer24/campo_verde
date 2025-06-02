package ar.edu.uncuyo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "producto")
public class Producto {

    @Id
    @Column(name = "cod", nullable = false)
    private Long cod;

    @Column(name = "cantidad")
    private Integer cantidad;

    @Column(name = "descr")
    private String descripcion;

    @Column(name = "precio")
    private Double precio;

    public Producto() {
        // Constructor vacío requerido por JPA
    }

    public Producto(Long cod, Integer cantidad, String descripcion, Double precio) {
        this.cod = cod;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
        this.precio = precio;
    }

    // Getters y Setters
    public Long getCod() {
        return cod;
    }

    public void setCod(Long cod) {
        this.cod = cod;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    @Override
    public String toString() {
        return "Producto{" +
                "cod=" + cod +
                ", cantidad=" + cantidad +
                ", descripcion='" + descripcion + '\'' +
                ", precio=" + precio +
                '}';
    }
}