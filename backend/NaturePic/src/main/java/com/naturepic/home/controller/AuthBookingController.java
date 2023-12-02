package com.naturepic.home.controller;

import com.naturepic.home.model.BookingDto;
import com.naturepic.home.service.BookingService;
import com.naturepic.home.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/authbookings")
public class AuthBookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<String> createBooking(@Valid @RequestBody BookingDto bookingDto,
                                                @RequestHeader("Authorization") String authToken) {
        String username = jwtService.extractUsername(authToken.substring(7));

        // Obtener productId del BookingDto y setearlo
        Long productId = bookingDto.getProductId();
        bookingDto.setProductId(productId);

        String response = bookingService.createBooking(bookingDto, username);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/mybookings")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<List<BookingDto>> getMyBookings(@RequestHeader("Authorization") String authToken) {
        String token = authToken.substring(7); // Remover "Bearer " del inicio del token
        String username = jwtService.extractUsername(token);
        List<BookingDto> bookings = bookingService.getBookingsForUser(username);
        return ResponseEntity.ok(bookings);
    }
}
