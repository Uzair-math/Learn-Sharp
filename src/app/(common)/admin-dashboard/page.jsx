"use client"
import React from 'react';
import Sidebar from '@/components/(shared)/Sidebar/Sidebar';
import Chart from '@/app/(common)/admin-dashboard/Chart';
import Link from 'next/link';


const AdminDashboardPage = () => {

  return (
    <div className="h-[100dvh] flex flex-col justify-between">
      <div className='relative min-h-screen md:flex'>
        <Sidebar />
        <div className="">
          <div className='flex md:ml-55'>
            <div className='p-5'>
              <div className="stats stats-vertical lg:stats-horizontal shadow">

                <div className="stat">
                  <div className="stat-title">Total User</div>
                  <div className="stat-value">31K</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Student</div>
                  <div className="stat-value">4,200</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Tutor</div>
                  <div className="stat-value">4,200</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Tutor Request</div>
                  <div className="stat-value">2,000</div>
                </div>

                <div className="stat">
                  <div className="stat-title">New Registers</div>
                  <div className="stat-value">1,200</div>
                  <div className="stat-desc"></div>
                </div>

              </div>
            </div>
          </div>
          <div className=" grid grid-cols-4 items-end">
            <button className="btn p-2 bg-slate-500 text-white hover:bg-slate-700">Course Management</button>
            <button className="btn p-2 bg-slate-500 text-white hover:bg-slate-700">Tutor All List</button>
            <Link href={"/admin-dashboard/userManagement"}>
              <button className="btn p-2 bg-slate-500 text-white hover:bg-slate-700">User Management</button>
            </Link>
            <button className="btn p-2 bg-slate-500 text-white hover:bg-slate-700">Feedback and Complaints</button>

          </div>
          <div className="">
            <Chart></Chart>
          </div>
        </div>
      </div>


    </div>

  );
};

export default AdminDashboardPage;