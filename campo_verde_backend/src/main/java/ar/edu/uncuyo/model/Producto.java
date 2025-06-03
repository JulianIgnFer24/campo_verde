package ar.edu.uncuyo.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.*; // ← Importante para @JsonProperty
import java.io.Serializable;

@Entity
@Table(name = "producto")
public class Producto implements Serializable {

    private static final long serialVersionUID = 1L;

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

    // Getters y Setters normales

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

    // Este método permite recibir el campo "descripcion" desde JSON
    @JsonProperty("descripcion")
    public String getDescripcionJSON() {
        return descripcion;
    }

    @JsonProperty("descripcion")
    public void parseDescripcion(@JsonProperty("descripcion") String descripcion) {
        this.descripcion = descripcion;
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