package com.naturepic.home.service;

import com.naturepic.home.model.BookingDto;

import java.util.List;

public interface IBookingService {

    String createBooking(BookingDto bookingDto, String username);

    List<BookingDto> getBookingsForUser(String username);

}
