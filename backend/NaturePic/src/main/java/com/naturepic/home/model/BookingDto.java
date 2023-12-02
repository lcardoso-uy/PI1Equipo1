package com.naturepic.home.model;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class BookingDto {

    private Long id;

    @NotNull
    private Long productId; // ID del producto

    private List<Long> productCalendarIds; // IDs de los calendarios de producto

    @NotNull
    @FutureOrPresent
    private LocalDate startDate; // Fecha de inicio

    @NotNull
    @FutureOrPresent
    private LocalDate endDate; // Fecha de fin

    @Size(max = 2000)
    private String comment; // Comentario u observaciones

    // Constructor sin parámetros para Lombok
    public BookingDto() {
        // No se inicializan bookingDate y bookingTime aquí
    }

    public void setUserId(Integer integer) {
    }

    @Override
    public String toString() {
        return "BookingDto{" +
                "id=" + id +
                ", productId=" + productId +
                ", productCalendarIds=" + productCalendarIds +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", comment='" + comment + '\'' +
                '}';
    }

}
