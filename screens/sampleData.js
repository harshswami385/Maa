
export const recentItems = [
    { id: '1', name: 'Dr. Sumitha', image: require('../assets/a.png') },
    { id: '2', name: 'Apex Hospital', image: require('../assets/b.png') },
    { id: '3', name: 'Dr. Pandit Ji', image: require('../assets/c.png') },
    { id: '4', name: 'Apollo Hospital', image: require('../assets/d.png') },
];

export const symptoms = [
    { id: '1', name: 'Cough', image: require('../assets/e.png') },
    { id: '2', name: 'Fever', image: require('../assets/f.png') },
    { id: '3', name: 'Headache', image: require('../assets/g.png') },
    { id: '4', name: 'Stomach Ache', image: require('../assets/e.png') },
];

const specialistCategories = [
    { id: '1', name: 'Cardiology', image: require('../assets/Cardiology.png.png') },
    { id: '2', name: 'Pediatrics', image: require('../assets/Pediatrics.png.png') },
    { id: '3', name: 'General Physician', image: require('../assets/GeneralPhysician.png.png') },
    { id: '4', name: 'Gastrology', image: require('../assets/Gastrology.png.png') },
];

// Sample data for doctors
export const doctorsList = [
    {
        id: '1',
        name: 'Dr. Amitsha Agarwal',
        specialty: 'Cardiologist',
        hospitalName: 'BC Roy Hospital',
        clinicName: 'BC Roy Hospital, IIT Kharagpur',
        clinicImage: require('../assets/clinic.jpg'),
        address: 'BC Roy hospital, Indian Institute of Technology Kharagpur, Kharagpur, West Medinapore, West Bengal, 721302',
        pinCode: '721302',
        district: 'West Medinapore',
        state: 'West Bengal',
        image: require('../assets/fedoc.jpg'),
        experience: '10+ years',
        rating: 4.8,
        currentQueue: 87,
        yourQueue: 87,
        Schedule: 'Everyday 10:00 AM to 2:00 PM',
        waitingTime: '35 Minutes',
        fees: '₹1500',
        contactNumber: '+91-1234567890',
        about: 'Dr. Amitsha Agarwal is a highly experienced cardiologist with over 10 years of experience. She specializes in treating complex heart conditions and is known for her patient-centric approach.',
        reviews: [
            {
                id: '1',
                reviewer: 'Khush Pahad',
                date: '2 weeks ago',
                rating: 4.5,
                reviewText: 'CareQ made the entire process so smooth! Booking with Dr. Amitsha was easy, and her expertise is unmatched. I recommend CareQ to everyone looking for quality medical care.',
            },
        ],
        schedule: [
            {
                day: 'Monday',
                clinics: [
                    {
                        clinicName: 'BC Roy Hospital, IIT Kharagpur',
                        clinicImage: require('../assets/clinic.jpg'),
                        location: 'BC Roy hospital, IIT Kharagpur, West Bengal, 721302',
                        timings: ['10:00 AM - 1:00 PM'],
                    },
                    {
                        clinicName: 'Heart Care Clinic',
                        clinicImage: require('../assets/clinic.jpg'),
                        location: 'Heart Care Center, 45 Main Road, Kharagpur',
                        timings: ['2:00 PM - 5:00 PM'],
                    },
                ],
            },
            {
                day: 'Tuesday',
                clinics: [
                    {
                        clinicName: 'Not Available',
                        clinicImage: require('../assets/clinic.jpg'),
                        location: 'Doctor is not available on this day.',
                        timings: [],
                    },
                ],
            },
            {
                day: 'Wednesday',
                clinics: [
                    {
                        clinicName: 'BC Roy Hospital, IIT Kharagpur',
                        clinicImage: require('../assets/clinic.jpg'),
                        location: 'BC Roy hospital, IIT Kharagpur, West Bengal, 721302',
                        timings: ['10:00 AM - 2:00 PM'],
                    },
                ],
            },
            {
                day: 'Thursday',
                clinics: [
                    {
                        clinicName: 'Not Available',
                        clinicImage: require('../assets/clinic.jpg'),
                        location: 'Doctor is not available on this day.',
                        timings: [],
                    },
                ],
            },
            {
                day: 'Friday',
                clinics: [
                    {
                        clinicName: 'Heart Care Clinic',
                        clinicImage: require('../assets/clinic.jpg'),
                        location: 'Heart Care Center, 45 Main Road, Kharagpur',
                        timings: ['10:00 AM - 2:00 PM'],
                    },
                ],
            },
            {
                day: 'Saturday',
                clinics: [
                    {
                        clinicName: 'Not Available',
                        clinicImage: require('../assets/clinic.jpg'),
                        location: 'Doctor is not available on this day.',
                        timings: [],
                    },
                ],
            },
            {
                day: 'Sunday',
                clinics: [
                    {
                        clinicName: 'Not Available',
                        clinicImage: require('../assets/clinic.jpg'),
                        location: 'Doctor is not available on this day.',
                        timings: [],
                    },
                ],
            },
        ],
    },
    {
        id: '2',
        name: 'Dr. Sumit Verma',
        specialty: 'General Physician',
        hospitalName: 'MediCare Clinic',
        clinicName: 'MediCare Hospital',
        clinicImage: require('../assets/clinicdent.jpg'),
        address: '67 Third Blvd, Downtown',
        pinCode: '110001',
        district: 'Downtown District',
        state: 'New Delhi',
        image: require('../assets/Sumitpic.jpg'),
        experience: '8 years',
        rating: 4.6,
        currentQueue: 42,
        yourQueue: 42,
        Schedule: 'Mon-Fri 9:00 AM to 1:00 PM',
        waitingTime: '25 Minutes',
        fees: '₹1000',
        contactNumber: '+91-9876543210',
        about: 'Dr. Sumita Verma has 8 years of experience as a general physician. She is committed to providing comprehensive medical care and building lasting patient relationships.',
        reviews: [
            {
                id: '2',
                reviewer: 'John Doe',
                date: '3 weeks ago',
                rating: 4.2,
                reviewText: 'Thanks to CareQ, I found Dr. Sumit Verma with ease. The service was impeccable, and the doctor was thorough. Definitely worth recommending to friends and family.',
            },
        ],
        schedule: [
            {
                day: 'Monday',
                clinics: [
                    {
                        clinicName: 'MediCare Clinic',
                        clinicImage: require('../assets/clinicdent.jpg'),
                        location: '67 Third Blvd, Downtown, New Delhi, 110001',
                        timings: ['9:00 AM - 1:00 PM'],
                    },
                ],
            },
            {
                day: 'Tuesday',
                clinics: [
                    {
                        clinicName: 'MediCare Hospital',
                        clinicImage: require('../assets/clinicdent.jpg'),
                        location: 'MediCare Hospital, 15 Cross Road, New Delhi',
                        timings: ['9:00 AM - 1:00 PM'],
                    },
                ],
            },
            {
                day: 'Wednesday',
                clinics: [
                    {
                        clinicName: 'Not Available',
                        clinicImage: require('../assets/clinicdent.jpg'),
                        location: 'Doctor is not available on this day.',
                        timings: [],
                    },
                ],
            },
            {
                day: 'Thursday',
                clinics: [
                    {
                        clinicName: 'MediCare Clinic',
                        clinicImage: require('../assets/clinicdent.jpg'),
                        location: '67 Third Blvd, Downtown, New Delhi, 110001',
                        timings: ['9:00 AM - 1:00 PM'],
                    },
                    {
                        clinicName: 'MediCare Hospital',
                        clinicImage: require('../assets/clinicdent.jpg'),
                        location: 'MediCare Hospital, 15 Cross Road, New Delhi',
                        timings: ['2:00 PM - 5:00 PM'],
                    },
                ],
            },
            {
                day: 'Friday',
                clinics: [
                    {
                        clinicName: 'MediCare Clinic',
                        clinicImage: require('../assets/clinicdent.jpg'),
                        location: '67 Third Blvd, Downtown, New Delhi, 110001',
                        timings: ['9:00 AM - 1:00 PM'],
                    },
                ],
            },
            {
                day: 'Saturday',
                clinics: [
                    {
                        clinicName: 'Not Available',
                        clinicImage: require('../assets/clinicdent.jpg'),
                        location: 'Doctor is not available on this day.',
                        timings: [],
                    },
                ],
            },
            {
                day: 'Sunday',
                clinics: [
                    {
                        clinicName: 'Not Available',
                        clinicImage: require('../assets/clinicdent.jpg'),
                        location: 'Doctor is not available on this day.',
                        timings: [],
                    },
                ],
            },
        ],
    },
    {
        id: '3',
        name: 'Dr. Rahul Sharma',
        specialty: 'Pediatrician',
        hospitalName: 'Apollo Clinic',
        clinicName: 'Apollo Hospital',
        clinicImage: require('../assets/clinicdent.jpg'),
        address: '45 Second Ave, Uptown',
        pinCode: '400051',
        district: 'Uptown District',
        state: 'Maharashtra',
        image: require('../assets/Maledoc.jpg'),
        experience: '5 years',
        rating: 4.7,
        currentQueue: 55,
        yourQueue: 55,
        Schedule: 'Weekdays 11:00 AM to 3:00 PM',
        waitingTime: '20 Minutes',
        fees: '₹1200',
        contactNumber: '+91-1122334455',
        about: 'Dr. Rahul Sharma is a dedicated pediatrician with 5 years of experience. He is passionate about child healthcare and known for his compassionate approach towards young patients.',
        reviews: [
            {
                id: '3',
                reviewer: 'Jane Smith',
                date: '1 week ago',
                rating: 4.3,
                reviewText: 'Using CareQ was a game changer. Dr. Rahul Sharma was attentive and kind. This app makes healthcare so much easier to access. Highly recommended!',
            },
            {
                id: '4',
                reviewer: 'John Doe',
                date: '1 month ago',
                image: require('../assets/Maledoc.jpg'),
                rating: 5,
                reviewText: 'Dr. Rahul provided exceptional care, and I found him effortlessly through CareQ. Great experience, I can’t imagine going back to the old ways of booking!',
            },
        ],
        schedule: [
            {
                day: 'Monday',
                clinics: [
                    {
                        clinicName: 'Apollo Clinic',
                        clinicImage: require('../assets/clinicdent.jpg'),
                        location: '45 Second Ave, Uptown, Maharashtra',
                        timings: ['11:00 AM - 1:00 PM'],
                    },
                ],
            },
            {
                day: 'Tuesday',
                clinics: [
                    {
                        clinicName: 'Apollo Clinic',
                        clinicImage: require('../assets/clinicdent.jpg'),
                        location: '45 Second Ave, Uptown, Maharashtra',
                        timings: ['11:00 AM - 1:00 PM', '2:00 PM - 4:00 PM'],
                    },
                ],
            },
            {
                day: 'Wednesday',
                clinics: [
                    {
                        clinicName: 'Not Available',
                        clinicImage: require('../assets/clinicdent.jpg'),
                        location: 'Doctor is not available on this day.',
                        timings: [],
                    },
                ],
            },
            {
                day: 'Thursday',
                clinics: [
                    {
                        clinicName: 'Apollo Hospital',
                        clinicImage: require('../assets/clinicdent.jpg'),
                        location: 'Apollo Hospital, 1014 Street, Uptown',
                        timings: ['11:00 AM - 1:00 PM'],
                    },
                ],
            },
            {
                day: 'Friday',
                clinics: [
                    {
                        clinicName: 'Not Available',
                        clinicImage: require('../assets/clinicdent.jpg'),
                        location: 'Doctor is not available on this day.',
                        timings: [],
                    },
                ],
            },
            {
                day: 'Saturday',
                clinics: [
                    {
                        clinicName: 'Apollo Clinic',
                        clinicImage: require('../assets/clinicdent.jpg'),
                        location: '45 Second Ave, Uptown, Maharashtra',
                        timings: ['12:00 PM - 3:00 PM'],
                    },
                ],
            },
            {
                day: 'Sunday',
                clinics: [
                    {
                        clinicName: 'Not Available',
                        clinicImage: require('../assets/clinicdent.jpg'),
                        location: 'Doctor is not available on this day.',
                        timings: [],
                    },
                ],
            },
        ],
    },
    {
        id: '4',
        name: 'Dr. Harshita Sinha',
        specialty: 'Surgeon',
        hospitalName: 'Global Health Clinic',
        clinicName: 'Global Health Clinic',
        clinicImage: require('../assets/clinic.jpg'),
        address: '89 Fourth Rd, Suburbia',
        pinCode: '560100',
        district: 'Suburbia District',
        state: 'Karnataka',
        image: require('../assets/docandpat.jpg'),
        experience: '15 years',
        rating: 4.5,
        currentQueue: 30,
        yourQueue: 30,
        Schedule: 'Sat-Sun 8:00 AM to 12:00 PM',
        waitingTime: '40 Minutes',
        fees: '₹2000',
        contactNumber: '+91-9988776655',
        about: 'Dr. Priya Sinha is an accomplished surgeon with 15 years of experience. She is proficient in various surgical procedures and is highly regarded for her precision and skill.',
        reviews: [
            {
                id: '4',
                reviewer: 'Anita Gupta',
                date: '4 weeks ago',
                rating: 4.4,
                reviewText: 'Booking through CareQ was seamless. Dr. Harshita Sinha was professional and knowledgeable. I highly recommend both CareQ and Dr. Sinha for anyone in need of surgery.',
            },
        ],
        schedule: [
            {
                day: 'Monday',
                clinics: [
                    {
                        clinicName: 'Global Health Clinic',
                        clinicImage: require('../assets/clinic.jpg'),
                        location: '89 Fourth Rd, Suburbia, Karnataka, 560100',
                        timings: ['9:00 AM - 12:00 PM'],
                    },
                ],
            },
            {
                day: 'Tuesday',
                clinics: [
                    {
                        clinicName: 'Not Available',
                        clinicImage: require('../assets/clinic.jpg'),
                        location: 'Doctor is not available on this day.',
                        timings: [],
                    },
                ],
            },
            {
                day: 'Wednesday',
                clinics: [
                    {
                        clinicName: 'Global Health Clinic',
                        clinicImage: require('../assets/clinic.jpg'),
                        location: '89 Fourth Rd, Suburbia, Karnataka, 560100',
                        timings: ['10:00 AM - 1:00 PM'],
                    },
                ],
            },
            {
                day: 'Thursday',
                clinics: [
                    {
                        clinicName: 'Not Available',
                        clinicImage: require('../assets/clinic.jpg'),
                        location: 'Doctor is not available on this day.',
                        timings: [],
                    },
                ],
            },
            {
                day: 'Friday',
                clinics: [
                    {
                        clinicName: 'Not Available',
                        clinicImage: require('../assets/clinic.jpg'),
                        location: 'Doctor is not available on this day.',
                        timings: [],
                    },
                ],
            },
            {
                day: 'Saturday',
                clinics: [
                    {
                        clinicName: 'Global Health Clinic',
                        clinicImage: require('../assets/clinic.jpg'),
                        location: '89 Fourth Rd, Suburbia, Karnataka, 560100',
                        timings: ['8:00 AM - 12:00 PM'],
                    },
                ],
            },
            {
                day: 'Sunday',
                clinics: [
                    {
                        clinicName: 'Not Available',
                        clinicImage: require('../assets/clinic.jpg'),
                        location: 'Doctor is not available on this day.',
                        timings: [],
                    },
                ],
            },
        ],
    },
];





// Sample data for hospitals
export const hospitalsList = [
    {
        id: '1',
        name: 'Apex Hospital',
        address: '123 Main St, City Center',
        image: require('../assets/Ada.jpg'),
        rating: 4.2,
    },
    {
        id: '2',
        name: 'Apollo Hospital',
        address: '45 Second Ave, Uptown',
        image: require('../assets/Ada.jpg'),
        rating: 4.7,
    },
    {
        id: '3',
        name: 'MediCare Hospital',
        address: '67 Third Blvd, Downtown',
        image: require('../assets/Ada.jpg'),
        rating: 4.4,
    },
    {
        id: '4',
        name: 'Global Health Clinic',
        address: '89 Fourth Rd, Suburbia',
        image: require('../assets/Ada.jpg'),
        rating: 4.3,
    },
];
