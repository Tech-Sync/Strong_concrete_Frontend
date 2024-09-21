/* eslint-disable @next/next/no-img-element */
'use client'
import { ReactSortable } from 'react-sortablejs';
import { useState, useEffect } from 'react';
import { coloredToast } from '@/utils/sweetAlerts';
import { PreviewIcon, ScrumboardDateIcon, ScrumboardTagIcon } from '@/app/icons';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { useAppDispatch } from '@/lib/hooks';
import { getWeeklySale, updateOrder } from '@/lib/features/sale/saleActions';

const SaleScrumboard = () => {

    const dispatch = useAppDispatch();
    const router = useRouter()
    // const sales = useAppSelector(selectWeeklySales);
    const [projectList, setProjectList] = useState<any>([]);

    const [weekRange, setWeekRange] = useState({
        start: moment().startOf('isoWeek').format('YYYY-MM-DD'),
        end: moment().endOf('isoWeek').format('YYYY-MM-DD'),
    });


    // Function to move to the previous week
    const handlePrevWeek = () => {
        setWeekRange({
            start: moment(weekRange.start, 'YYYY-MM-DD').subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD'),
            end: moment(weekRange.start, 'YYYY-MM-DD').subtract(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD'),
        });
    };

    // Function to move to the next week
    const handleNextWeek = () => {
        setWeekRange({
            start: moment(weekRange.start, 'YYYY-MM-DD').add(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD'),
            end: moment(weekRange.start, 'YYYY-MM-DD').add(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD'),
        });
    };

    // Function to reset to the current week
    const handleThisWeek = () => {
        setWeekRange({
            start: moment().startOf('isoWeek').format('YYYY-MM-DD'),
            end: moment().endOf('isoWeek').format('YYYY-MM-DD'),
        });
    };


    useEffect(() => {
        // dispatch(getWeeklySaleAsync({ startDate: '', endDate: '' }));
        (async () => {
            const sales = await getWeeklySale(weekRange.start, weekRange.end)
            setProjectList(sales.weeklySale);

        })()

        // const clonedSales = JSON.parse(JSON.stringify(sales));
        // setProjectList(clonedSales);
    }, [weekRange.start, weekRange.end]);

    // useEffect(() => {
    //     const clonedSales = JSON.parse(JSON.stringify(sales));
    // setProjectList(clonedSales);
    // }, [sales]);


    // const isDisabled = moment().isAfter(weekRange.end);

    return (
        <div>
            <div className='flex items-center justify-between sm:flex-row flex-col gap-y-2'>
                <div className='flex gap-2'>
                    <button className='btn btn-outline-primary btn-sm' onClick={handlePrevWeek}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </button>
                    <button className='btn btn-outline-primary btn-sm' onClick={handleNextWeek}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </button>
                </div>
                <div>
                    <h1 className='text-2xl text-slate-400'>{weekRange.start} / {weekRange.end}</h1>
                </div>
                <div className='flex gap-2'>
                    <button className='btn btn-outline-primary btn-sm' onClick={handleThisWeek}>This Week</button>
                </div>
            </div>
            <div className="relative pt-5">
                <div className="perfect-scrollbar h-full -mx-2">
                    <div className="overflow-x-auto flex items-start flex-nowrap gap-5 pb-2 px-2">
                        {projectList?.map((project: any) => {
                            return (
                                <div key={project.id} className="panel w-[17rem] flex-none" data-group={project.id}>
                                    <div className="flex justify-between mb-5">
                                        <h4 className="text-base font-semibold">{project.title}</h4>
                                        {/* 
                                        <div className="flex items-center">
                                            <button type="button" className="hover:text-primary ltr:mr-2 rtl:ml-2">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                                    <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                                    <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                            </button>
                                        </div>
                                         */}
                                    </div>
                                    <div project-id={project.id}>

                                        <ReactSortable
                                            list={project.orders}
                                            setList={(newState, sortable) => {

                                                if (sortable) {

                                                    const groupId: any = sortable.el.closest('[data-group]')?.getAttribute('data-group') || 0;
                                                    const newList = projectList?.map((task: any) => {
                                                        if (parseInt(task.id) === parseInt(groupId)) {
                                                            task.orders = newState;
                                                        }

                                                        return task;
                                                    });
                                                    setProjectList(newList);
                                                }
                                            }}
                                            onEnd={async (evt) => {
                                                // Check if the dragged item was moved

                                                const draggedSaleId = evt.item.dataset.id;
                                                //@ts-ignore
                                                const newOrderNumber = evt?.newIndex + 1;
                                                const newProjectId = evt.to.parentElement?.attributes[0].nodeValue;
                                                //@ts-ignore
                                                const newProject = projectList.find(project => project.id.toString() === newProjectId);
                                                if (newProject) {
                                                    const newOrderDate = newProject.date;
                                                    // console.log(evt.item);
                                                    // console.log(`Dragged Item ID: ${draggedSaleId}, New Order Number: ${newOrderNumber}, New Project Date: ${newOrderDate}`);
                                                    const updateOrderData = { newOrderNumber, newOrderDate };

                                                    if (draggedSaleId) {

                                                        if (evt.oldIndex === evt.newIndex && evt.from === evt.to) return;

                                                        const res = await updateOrder(draggedSaleId, updateOrderData);
                                                        const sales = await getWeeklySale(weekRange.start, weekRange.end);
                                                        setProjectList(sales.weeklySale);
                                                        coloredToast("success", res.message, "bottom-start");
                                                    }
                                                } else {
                                                    console.error("Something went wrong sorry..");
                                                }

                                            }}
                                            animation={200}
                                            disabled={moment().isAfter(weekRange.end)}
                                            group={{ name: 'shared', pull: true, put: true }}
                                            ghostClass="sortable-ghost"
                                            dragClass="sortable-drag"
                                            className="connect-sorting-content min-h-[150px]"
                                            data-date={project.date}
                                        >
                                            {project.orders?.map((order: any) => {
                                                const desc = order.description.split(',')

                                                return (
                                                    <div className="sortable-list " key={order.id} data-date={project.date}>
                                                        <div className="shadow bg-[#f4f4f4] dark:bg-white-dark/20 p-3 pb-5 rounded-md mb-5 space-y-3 cursor-move">
                                                            <div className="text-base text-center font-medium">{order.title}</div>
                                                            {desc.map((d: any, i: number) => <p key={i} className="break-all font-mono leading-3 ">{d}</p>)}

                                                            <div className="flex gap-2 items-center flex-wrap">
                                                                <div className={`btn flex ${order.tags === 'PENDING' ? 'btn-outline-warning'
                                                                    : order.tags === 'APPROVED' ? 'btn-outline-success'
                                                                        : order.tags === 'REJECTED' ? 'btn-outline-danger'
                                                                            : order.tags === 'CANCELLED' ? 'btn-outline-dark' : ''}  p-1 text-xs`}>
                                                                    <ScrumboardTagIcon />
                                                                    <span className="ltr:ml-2 rtl:mr-2">{order.tags}</span>
                                                                </div>
                                                                {/*   <div className="btn px-2 py-1 flex text-white-dark dark:border-white-dark/50 shadow-none">
                                                                    <ScrumboardTagIcon />
                                                                    <span className="ltr:ml-2 rtl:mr-2">No Tags</span>
                                                                </div> */}
                                                            </div>
                                                            <div className="flex items-center justify-between cursor-pointer" >
                                                                <div className="font-medium flex items-center hover:text-primary">
                                                                    <ScrumboardDateIcon />
                                                                    <span>{order.date}</span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    {/* <button type="button" className="hover:text-info"
                                                                        onClick={() => {
                                                                            router.push(`/sales/add`);
                                                                            dispatch(updateSaleState(order))
                                                                        }}
                                                                    >
                                                                        <ScrumboardEditIcon />
                                                                    </button> */}
                                                                    <button type="button" className="hover:text-danger" onClick={() => router.push(`/sales/${order.id}`)}>
                                                                        <PreviewIcon />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </ReactSortable>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SaleScrumboard;
