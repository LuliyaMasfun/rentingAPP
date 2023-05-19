package com.example.bokningsapp.dto;

import com.example.bokningsapp.enums.EquipmentType;
import com.example.bokningsapp.enums.EventType;
import com.example.bokningsapp.enums.HubType;

public record RentalDTO(
        Long id,
        String ean13,

        String rentalNumber,

        Long maxDaysToRent,
        EquipmentType equipmentType,
        HubType hubType,
        EventType eventType,

        UserDto userDto
) {

}
