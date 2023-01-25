package com.example.bokningsapp.model;

import com.example.bokningsapp.enums.EquipmentType;
import com.example.bokningsapp.enums.EquipmentStatus;
import jakarta.persistence.*;

    @Entity
    @Table(name="sounds")
    public class Sound {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int soundId;

        @Column
        private String soundName;

        @Column
        private String soundLocation;

        @Column
        private String soundImg;

        @Column
        private int maxDaysToRent;

        @Column
        private String soundDescription;

        @Column
        private String soundBrand;

        @Column
        private EquipmentType soundType;

        @Column
        private EquipmentStatus soundStatus;

        public Sound() {
        }

        public int getSoundId() {
            return soundId;
        }

        public void setSoundId(int soundId) {
            this.soundId = soundId;
        }

        public String getSoundName() {
            return soundName;
        }

        public void setSoundName(String soundName) {
            this.soundName = soundName;
        }

        public String getSoundLocation() {
            return soundLocation;
        }

        public void setSoundLocation(String soundLocation) {
            this.soundLocation = soundLocation;
        }

        public String getSoundImg() {
            return soundImg;
        }

        public void setSoundImg(String soundImg) {
            this.soundImg = soundImg;
        }

        public int getMaxDaysToRent() {
            return maxDaysToRent;
        }

        public void setMaxDaysToRent(int maxDaysToRent) {
            this.maxDaysToRent = maxDaysToRent;
        }

        public String getSoundDescription() {
            return soundDescription;
        }

        public void setSoundDescription(String soundDescription) {
            this.soundDescription = soundDescription;
        }

        public String getSoundBrand() {
            return soundBrand;
        }

        public void setSoundBrand(String soundBrand) {
            this.soundBrand = soundBrand;
        }

        public EquipmentType getSoundType() {
            return soundType;
        }

        public void setSoundType(EquipmentType soundType) {
            this.soundType = soundType;
        }

        public EquipmentStatus getSoundStatus() {
            return soundStatus;
        }

        public void setSoundStatus(EquipmentStatus soundStatus) {
            this.soundStatus = soundStatus;
        }

        @Override
        public String toString() {
            return "RodeSound{" +
                    "soundId=" + soundId +
                    ", soundName='" + soundName + '\'' +
                    ", soundLocation='" + soundLocation + '\'' +
                    ", soundImg='" + soundImg + '\'' +
                    ", maxDaysToRent=" + maxDaysToRent +
                    ", soundDescription='" + soundDescription + '\'' +
                    ", soundBrand='" + soundBrand + '\'' +
                    ", soundType=" + soundType +
                    ", soundStatus=" + soundStatus +
                    '}';
        }
    }

