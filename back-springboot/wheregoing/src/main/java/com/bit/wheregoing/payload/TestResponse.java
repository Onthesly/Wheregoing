package com.bit.wheregoing.payload;

import java.util.List;

import com.bit.wheregoing.model.Hotels;
import com.bit.wheregoing.model.Location;
import com.bit.wheregoing.model.Startpoint;
import com.bit.wheregoing.model.TouristAttraction;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TestResponse<T> {
	private List<Hotels> hotels;
	private List<TouristAttraction> touristAttraction;
	private Startpoint startpoint;
	private List<String> daysString;
	private List<List<Location>> daysList;
	private String hypenString;
}

