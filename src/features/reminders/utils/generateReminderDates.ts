type GenerateReminderDatesParams = {
    deadline: Date;
    daysBefore: number;
    times: string[];
    now?: Date;
};

function parseTime(time: string): [number, number] {
    const match = /^(\d{2}):(\d{2})$/.exec(time);

    if (!match) {
        throw new Error('Invalid reminder time');
    }

    const hours = Number(match[1]);
    const minutes = Number(match[2]);

    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        throw new Error('Invalid reminder time');
    }

    return [hours, minutes];
}

function validateDaysBefore(daysBefore: number): void {
    if (daysBefore < 0) {
        throw new Error('daysBefore value cannot be negative');
    }
}

function createReminderDate(date: Date, time: string): Date {
    const [hours, minutes] = parseTime(time);
    const reminderDate = new Date(date);
    reminderDate.setHours(hours, minutes, 0, 0);
    return reminderDate;
}

export function generateReminderDates({
    deadline,
    daysBefore,
    times,
    now = new Date(),
}: GenerateReminderDatesParams): Date[] {
    if (times.length === 0) {
        return [];
    }

    if (deadline < now) {
        return [];
    }

    validateDaysBefore(daysBefore);

    const reminders: Date[] = [];

    const startDate = new Date(deadline);
    startDate.setDate(startDate.getDate() - daysBefore);

    for (let currentDate = new Date(startDate); currentDate <= deadline; currentDate.setDate(currentDate.getDate() + 1)) {
        for (const time of times) {
            const reminderDate = createReminderDate(currentDate, time);

            if (reminderDate >= now && reminderDate <= deadline) {
                reminders.push(reminderDate);
            }
        }
    }
    return reminders.sort((a, b) => a.getTime() - b.getTime());
}
