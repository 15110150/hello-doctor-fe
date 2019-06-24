import { Booking } from './booking';
import { Doctor } from './doctor';
import { Patient } from './patient';

export class HealthRecordDTO {
    bookId: number;
    booking: Booking;
    content: string;
    doctor: Doctor;
    patient: Patient;
    prescriptionImage: string;
    userId: number;
}