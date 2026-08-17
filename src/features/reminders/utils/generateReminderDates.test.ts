import { generateReminderDates } from './generateReminderDates';

describe('generateReminderDates', () => {
    it('returns an empty array when no reminders are provided', () => {
        const deadline = new Date('2026-08-20T23:59:00');

        const result = generateReminderDates({
            deadline,
            daysBefore: 3,
            times: [],
        });

        expect(result).toEqual([]);
    });
});

it('creates reminders for each day and time until the deadline', () => {
    const deadline = new Date('2026-08-20T23:59:00');

    const result = generateReminderDates({
        deadline,
        daysBefore: 2,
        times: ['09:00', '18:00'],
    });

    expect(result).toHaveLength(6);

    expect(result[0]).toEqual(new Date('2026-08-18T09:00:00'));
    expect(result[1]).toEqual(new Date('2026-08-18T18:00:00'));
    expect(result[2]).toEqual(new Date('2026-08-19T09:00:00'));
    expect(result[3]).toEqual(new Date('2026-08-19T18:00:00'));
    expect(result[4]).toEqual(new Date('2026-08-20T09:00:00'));
    expect(result[5]).toEqual(new Date('2026-08-20T18:00:00'));
});

it('does not create reminders after the deadline date and time', () => {
    const deadline = new Date('2026-08-20T15:00:00');

    const result = generateReminderDates({
        deadline,
        daysBefore: 0,
        times: ['09:00', '18:00'],
    });
    
expect(result).toEqual([new Date('2026-08-20T09:00:00')]);
});

it('throws an error for an invalid reminder time format', () => {
    const deadline = new Date('2026-08-20T23:59:00');
    
    expect(() =>
        generateReminderDates({
            deadline,
            daysBefore: 1,
            times: ['25:99'], // Invalid time format
        })
    ).toThrow('Invalid reminder time');
});

it('throws an error if daysBefore is negative', () => {
    const deadline = new Date('2026-08-20T23:59:00');

    expect(() =>
        generateReminderDates({
            deadline,
            daysBefore: -1, // Invalid negative daysBefore
            times: ['09:00'],
        })
    ).toThrow('daysBefore value cannot be negative');
});

it('generates reminders in chronological order', () => {
    const deadline = new Date('2026-08-20T23:59:00');
    
    const result = generateReminderDates({
        deadline,
        daysBefore: 0,
        times: ['18:00', '09:00', '12:00'], // Out of order times
    });

    expect(result).toEqual([
        new Date('2026-08-20T09:00:00'),
        new Date('2026-08-20T12:00:00'),
        new Date('2026-08-20T18:00:00'),
    ]);
});

it('returns an empty array if the deadline is in the past', () => {
    const now = new Date('2026-08-20T12:00:00');
    const deadline = new Date('2026-08-19T23:59:00');

    const result = generateReminderDates({
        deadline,
        daysBefore: 3,
        times: ['09:00', '18:00'],
        now,
    });

    expect(result).toEqual([]);
});

it('does not generate reminders for times that have already passed on the current day', () => {
    const now = new Date('2026-08-20T12:00:00');
    const deadline = new Date('2026-08-20T23:59:00');

    const result = generateReminderDates({
        deadline,
        daysBefore: 0,
        times: ['09:00', '18:00'],
        now,
    });

    expect(result).toEqual([new Date('2026-08-20T18:00:00')]);
});
