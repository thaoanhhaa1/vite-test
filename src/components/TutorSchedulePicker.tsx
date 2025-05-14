import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { useState } from 'react';

interface SelectedSlots {
    [key: string]: boolean;
}

const TutorSchedulePicker = () => {
    // State để lưu trữ lịch đã chọn
    const [selectedSlots, setSelectedSlots] = useState<SelectedSlots>({});

    // Tạo mảng các giờ trong ngày
    const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7:00 - 20:00

    // Tạo mảng các ngày trong tuần
    const weekDays = [
        'Thứ 2',
        'Thứ 3',
        'Thứ 4',
        'Thứ 5',
        'Thứ 6',
        'Thứ 7',
        'Chủ nhật',
    ];

    // Xử lý khi click vào ô thời gian
    const handleSlotClick = (day: string, hour: number) => {
        const slotKey = `${day}-${hour}`;
        setSelectedSlots((prev) => ({
            ...prev,
            [slotKey]: !prev[slotKey],
        }));
    };

    return (
        <Card className='w-full max-w-4xl mx-auto'>
            <CardHeader className='space-y-1'>
                <div className='flex items-center space-x-2'>
                    <Calendar className='w-5 h-5' />
                    <CardTitle>Chọn lịch dạy</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className='overflow-x-auto'>
                    <table className='w-full border-collapse'>
                        <thead>
                            <tr>
                                <th className='p-2 border bg-gray-50'>Giờ</th>
                                {weekDays.map((day) => (
                                    <th
                                        key={day}
                                        className='p-2 border bg-gray-50 min-w-[100px]'
                                    >
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {hours.map((hour) => (
                                <tr key={hour}>
                                    <td className='p-2 border text-center bg-gray-50'>
                                        {`${hour}:00`}
                                    </td>
                                    {weekDays.map((day) => {
                                        const slotKey = `${day}-${hour}`;
                                        const isSelected =
                                            selectedSlots[slotKey];
                                        return (
                                            <td
                                                key={`${day}-${hour}`}
                                                className={`p-2 border text-center cursor-pointer transition-colors
                          ${
                              isSelected
                                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                                  : 'hover:bg-gray-100'
                          }`}
                                                onClick={() =>
                                                    handleSlotClick(day, hour)
                                                }
                                            >
                                                {isSelected ? '✓' : ''}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='mt-4 space-y-2'>
                    <div className='flex items-center space-x-2'>
                        <div className='w-4 h-4 bg-blue-500'></div>
                        <span>Đã chọn</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <div className='w-4 h-4 border'></div>
                        <span>Chưa chọn</span>
                    </div>
                </div>

                <div className='mt-6 flex justify-end'>
                    <Button
                        className='bg-blue-500 hover:bg-blue-600 text-white'
                        onClick={() => {
                            // Xử lý khi lưu lịch
                            console.log('Lịch đã chọn:', selectedSlots);
                        }}
                    >
                        Lưu lịch
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default TutorSchedulePicker;
