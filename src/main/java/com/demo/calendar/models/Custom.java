package com.demo.calendar.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(	name = "customs" )
public class Custom {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private boolean monFirst = true;
	private boolean showWeekday = true;
	private boolean showMonth = true;
	private boolean showYear = true;
	private boolean showFocus = true;
	private boolean weekdayShortForm = true;
	private String tableBackgroundColor = "opacity";
	private String textColor = "black";
	private String backgroundImage = "https://res.cloudinary.com/momentumclone/image/upload/v1530716793/bg2_rlzaqt.jpg";
	private String userId;

	public Custom() {
	}

	public Custom(boolean monFirst, boolean showWeekday, boolean showMonth,
                boolean showYear, boolean showFocus, boolean weekdayShortForm,
                String tableBackgroundColor, String textColor, String backgroundImage,
                String userId) {
		this.monFirst = monFirst;
		this.showWeekday = showWeekday;
		this.showMonth = showMonth;
        this.showYear = showYear;
        this.showFocus = showFocus;
        this.weekdayShortForm = weekdayShortForm;
        this.tableBackgroundColor = tableBackgroundColor;
        this.textColor = textColor;
        this.backgroundImage = backgroundImage;
        this.userId = userId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean getMonFirst() {
		return monFirst;
	}

	public void setMonFirst(boolean monFirst) {
		this.monFirst = monFirst;
	}

	public boolean getShowWeekday() {
		return showWeekday;
	}

	public void setShowWeekday(boolean showWeekday) {
		this.showWeekday = showWeekday;
	}

	public boolean getShowMonth() {
		return showMonth;
	}

	public void setShowMonth(boolean showMonth) {
		this.showMonth = showMonth;
	}

    public boolean getShowYear() {
		return showYear;
	}

	public void setShowYear(boolean showYear) {
		this.showYear = showYear;
	}

    public boolean getShowFocus() {
		return showFocus;
	}

	public void setShowFocus(boolean showFocus) {
		this.showFocus = showFocus;
	}

    public boolean getWeekdayShortForm() {
		return weekdayShortForm;
	}

	public void setWeekdayShortForm(boolean weekdayShortForm) {
		this.weekdayShortForm = weekdayShortForm;
	}

    public String getTableBackgroundColor() {
        return tableBackgroundColor;
    }

    public void setTableBackgroundColor(String tableBackgroundColor) {
        this.tableBackgroundColor = tableBackgroundColor;
    }
    
    public String getTextColor() {
        return textColor;
    }

    public void setTextColor(String textColor) {
        this.textColor = textColor;
    }

    public String getBackgroundImage() {
        return backgroundImage;
    }

    public void setBackgroundImage(String backgroundImage) {
        this.backgroundImage = backgroundImage;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
