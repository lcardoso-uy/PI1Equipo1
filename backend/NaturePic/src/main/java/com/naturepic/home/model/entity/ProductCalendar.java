package com.naturepic.home.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCalendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ProductStatus status; // Usando el enumerado

    @ManyToMany(mappedBy = "productCalendars")
    private List<Booking> bookings; // Nueva relación agregada

    public void addBooking(ProductCalendar productCalendar) {
        // Actualizar el estado a NO_DISPONIBLE
        this.setStatus(ProductStatus.NO_DISPONIBLE);
    }

/*
    public void addBooking(Booking booking) {
        if (bookings == null) {
            bookings = new ArrayList<>();
        }
        bookings.add(booking);
        booking.getProductCalendars().add(this);

        // Actualizar el estado a NO_DISPONIBLE
        this.setStatus(ProductStatus.NO_DISPONIBLE);
    }
*/


    @Override
    public String toString() {
        return "ProductCalendar{" +
                "id=" + id +
                "date=" + date +
                "status=" + status +
                '}';
    }

}
