package com.naturepic.home.service;

import com.naturepic.home.model.BookingDto;
import com.naturepic.home.model.entity.Booking;
import com.naturepic.home.model.entity.Product;
import com.naturepic.home.model.entity.ProductCalendar;
import com.naturepic.home.model.entity.UserInfo;
import com.naturepic.home.model.repository.BookingRepository;
import com.naturepic.home.model.repository.ProductCalendarRepository;
import com.naturepic.home.model.repository.ProductRepository;
import com.naturepic.home.model.repository.UserInfoRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class BookingService implements IBookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductCalendarRepository productCalendarRepository;

    private Logger logger = Logger.getLogger(ProductService.class);

    @Override
    public String createBooking(BookingDto bookingDto, String username) {
        UserInfo user = userInfoRepository.findByName(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Product product = productRepository.findById(bookingDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (!product.getStatus() || bookingDto.getStartDate().isAfter(bookingDto.getEndDate())) {
            return "Error: Producto no disponible o rango de fechas inválido";
        }

        List<ProductCalendar> availableCalendars = productCalendarRepository
                .findByProductIdAndDateBetween(bookingDto.getProductId(), bookingDto.getStartDate(), bookingDto.getEndDate());

        if (availableCalendars.size() < DAYS.between(bookingDto.getStartDate(), bookingDto.getEndDate()) + 1) {
            return "Error: No todos los días en el rango están disponibles";
        }

        logger.debug("BookingDto :: " + bookingDto.toString());
        logger.debug("Available Calendars :: " +  availableCalendars.toString());

        Booking booking = new Booking();
        booking.setUserInfo(user);
        booking.setProduct(product);
        booking.setStartDate(bookingDto.getStartDate());
        booking.setEndDate(bookingDto.getEndDate());
        booking.setComment(bookingDto.getComment());
        booking.setBookingDate(LocalDate.now());
        booking.setBookingTime(LocalTime.now());

        logger.debug("newBooking :: booking:" + booking.toString());

        if (!availableCalendars.isEmpty()) {
            List<ProductCalendar> productCalendars = new ArrayList<>(availableCalendars);
            booking.setProductCalendars(productCalendars);

            for (ProductCalendar productCalendar : productCalendars) {
                List<Booking> bookings = productCalendar.getBookings();
                if (bookings == null) {
                    bookings = new ArrayList<>();
                    productCalendar.setBookings(bookings);
                }

                bookings.add(booking);
                productCalendarRepository.save(productCalendar);

                logger.debug("newBooking :: Estado de ProductCalendar después de la reserva:" + productCalendar.getStatus());
            }
        }

        bookingRepository.save(booking);

        return "Booking created successfully with ID: " + booking.getId();
    }


    @Override
    public List<BookingDto> getBookingsForUser(String username) {
        UserInfo user = userInfoRepository.findByName(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getBookings().stream()
                .map(this::convertToBookingDto)
                .collect(Collectors.toList());
    }

    private BookingDto convertToBookingDto(Booking booking) {
        BookingDto bookingDto = new BookingDto();
        bookingDto.setId(booking.getId());
        bookingDto.setUserId(booking.getUserInfo() != null ? booking.getUserInfo().getId() : null);
        bookingDto.setProductId(booking.getProduct() != null ? booking.getProduct().getId() : null);
        bookingDto.setStartDate(booking.getStartDate());
        bookingDto.setEndDate(booking.getEndDate());
        bookingDto.setComment(booking.getComment());

        if (booking.getProductCalendars() != null) {
            bookingDto.setProductCalendarIds(booking.getProductCalendars().stream()
                    .map(ProductCalendar::getId)
                    .collect(Collectors.toList()));
        }
        return bookingDto;
    }
}
