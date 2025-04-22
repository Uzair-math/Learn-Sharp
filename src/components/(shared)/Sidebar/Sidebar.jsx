"use client"
import { useState } from 'react'
import Logo from '../../../assets/images/logo.png';
import UserImage from '../../../assets/images/user.png'
import { BsBookFill, BsBookmarkCheckFill } from 'react-icons/bs'
import { BiDetail, BiHome, BiLogOut } from 'react-icons/bi';
import { GiTeacher } from 'react-icons/gi';
import { LuContact } from 'react-icons/lu';
import { FaBook, FaCalendar, FaChalkboardTeacher, FaCreditCard, FaGraduationCap, FaHistory, FaInbox, FaMoneyBill, FaMoneyCheck, FaSave, FaUserCheck, FaWallet } from 'react-icons/fa';
import { AiOutlineBars } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { MdArticle, MdDashboard } from 'react-icons/md';

const Sidebar = () => {
  const { user, loading, setLoading, logOut, userRole } = useAuth();
  // console.log(user);
  const [isActive, setActive] = useState(false);
  const { replace, refresh } = useRouter();
  const searchParams = useSearchParams();

  // const userEmail = user?.email;
  const pathname = usePathname();
  const router = useRouter();
  

  const handleLogOut = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await logOut();
      // Cookies.set('token', '')
      toast.dismiss(toastId);
      toast.success("Logout successful!");
      setLoading(false);
      router.push('/login');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-teal-50 text-teal-700 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link href="/" className="flex gap-3 md:gap-3 items-center btn px-0 btn-ghost normal-case font-extrabold text-2xl lg:text-3xl text-teal-600 hover:bg-inherit">
              <Image className="max-h-[40px] max-w-[40px] rounded-full ring-2 ring-offset-2 ring-teal-700" width={40} height={40} src={Logo} alt="Learn Sharp  Logo" />
              <span className='animate-pulse flex items-center text-xl md:text-3xl'>
                {/* <Fade duration={300} triggerOnce={true} cascade>Learn Sharp </Fade> */}
                Learn Sharp 
              </span>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-teal-100'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-start overflow-x-hidden bg-teal-50 w-72 space-y-2 pt-0 pb-4 absolute inset-y-0 left-0 transform 
        ${isActive && '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          {/* Branding & Profile Info */}
          <div>
            <div className='w-full hidden md:flex py-4 justify-center items-center bg-teal-100 mx-auto'>
              <Link href="/" className="flex gap-3 md:gap-3 items-center btn px-0 btn-ghost normal-case font-extrabold text-2xl lg:text-3xl text-teal-600 hover:bg-inherit">
                <Image className="max-h-[40px] max-w-[40px] rounded-full ring-2 ring-offset-2 ring-teal-700" width={40} height={40} src={Logo} alt="Learn Sharp  Logo" />
                <span className='flex items-center text-lg md:text-xl'>
                  {/* <Fade duration={300} triggerOnce={true} cascade>Language School</Fade> */}
                  Learn Sharp 
                </span>
              </Link>
            </div>
            <div className='flex flex-col items-center mt-6 -mx-2'>
              <Link href='/dashboard'>
                {
                  user?.photoURL ?
                    <Image
                      className='max-h-[120px] max-w-[120px] object-cover object-center mx-2 rounded-full border border-teal-400 ring-2 ring-offset-1 ring-teal-500'
                      src={user?.photoURL}
                      width={484}
                      height={484}
                      alt={`Image of ${user?.displayName}`}
                      priority={true}
                    />
                    :
                    <Image
                      className='max-h-[120px] max-w-[120px] object-cover object-center mx-2 rounded-full border border-teal-400 ring-2 ring-offset-1 ring-teal-500'
                      src={UserImage}
                      width={484}
                      height={484}
                      alt="User Image"
                      priority={true}
                    />
                }
              </Link>
              <Link href='/dashboard'>
                <h4 className='mx-2 mt-3 font-medium text-gray-800  hover:underline'>
                  {user?.displayName}
                </h4>
              </Link>
              <Link href='/dashboard'>
                <p className='mx-2 mt-1 text-sm font-medium text-gray-600  hover:underline'>
                  {user?.email}
                </p>
              </Link>
              <p className="uppercase min-h-[24px] mt-3 px-5 py-0.5 text-sm bg-teal-300 w-fit mx-auto rounded-xl">
                {loading ? <span className="flex text-center justify-center items-center loading loading-md loading-dots"></span> : userRole }
              </p>
            </div>
          </div>
          <div className="divider mt-4 mb-2"></div>
          {/* Nav Items */}
          <div className='flex flex-col justify-start flex-1'>
            { loading ? (
              <div className="flex items-center justify-center px-4 py-2 transition-colors duration-300 transform text-teal-600">
                <span className="loading loading-md loading-bars"></span>
                <span className='mx-4 font-medium'>Loading menus...</span>
              </div>) :
              (<nav>
                <>

                  {/* Student */}
                  {
                    userRole === "student" &&
                    <>
                      <Link
                        href='/dashboard/student/hired-tutors'
                        className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/dashboard/student/hired-tutors" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
                        }
                      >
                        <FaMoneyCheck className='w-5 h-5' />
                        <span className='mx-4 font-medium'>Hired Tutors</span>
                      </Link>
                      <Link
                        href='/dashboard/student/booked-tutors'
                        className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/dashboard/student/booked-tutors" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
                        }
                      >
                        <FaCalendar className='w-5 h-5' />
                        <span className='mx-4 font-medium'>Booked Tutors</span>
                      </Link>
                      <Link
                        href='/dashboard/student/my-payments'
                        className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/dashboard/student/my-payments" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
                        }
                      >
                        <FaMoneyBill className='w-5 h-5' />
                        <span className='mx-4 font-medium'>My Payments</span>
                      </Link>
                      <Link
                        href='/dashboard/student/payment-history-student'
                        className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/dashboard/student/payment-history-student" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
                        }
                      >
                        <FaHistory className='w-5 h-5' />
                        <span className='mx-4 font-medium'>Payment History</span>
                      </Link>
                      <Link
                        href='/dashboard/student/my-messages'
                        className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/dashboard/student/my-messages" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
                        }
                      >
                        <FaInbox className='w-5 h-5' />
                        <span className='mx-4 font-medium'>My Messages</span>
                      </Link>
                    </>
                  }


                  {/* Tutor */}
                  {
                    userRole === "tutor" &&
                    <>
                      <Link
                        href='/dashboard/tutor/add-a-tuition'
                        className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/dashboard/tutor/add-a-tuition" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
                        }
                      >
                        <FaSave className='w-5 h-5' />
                        <span className='mx-4 font-medium'>Add a Tuition</span>
                      </Link>
                      <Link
                        href='/dashboard/tutor/my-tuitions'
                        className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/dashboard/tutor/my-tuitions" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
                        }
                      >
                        <FaGraduationCap className='w-5 h-5' />
                        <span className='mx-4 font-medium'>My Tuitions</span>
                      </Link>
                      <Link
                        href='/dashboard/tutor/my-students'
                        className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/dashboard/tutor/my-students" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
                        }
                      >
                        <FaBook className='w-5 h-5' />
                        <span className='mx-4 font-medium'>My Students</span>
                      </Link>
                      <Link
                        href='/dashboard/tutor/my-bookings'
                        className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/dashboard/tutor/my-bookings" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
                        }
                      >
                        <FaCalendar className='w-5 h-5' />
                        <span className='mx-4 font-medium'>My Bookings</span>
                      </Link>
                      <Link
                        href='/dashboard/tutor/payment-history-tutor'
                        className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/dashboard/tutor/payment-history-tutor" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
                        }
                      >
                        <FaHistory className='w-5 h-5' />
                        <span className='mx-4 font-medium'>Payment History</span>
                      </Link>
                      <Link
                        href='/dashboard/tutor/my-inbox'
                        className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/dashboard/tutor/my-inbox" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
                        }
                      >
                        <FaInbox className='w-5 h-5' />
                        <span className='mx-4 font-medium'>My Inbox</span>
                      </Link>
                    </>
                  }


                  {/* Admin */}
                  {
                    userRole === "admin" &&
                    <>
                      <Link
                        href='/dashboard/admin/manage-tuitions'
                        className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/dashboard/admin/manage-tuitions" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
                        }
                      >
                        <BsBookmarkCheckFill className='w-5 h-5' />
                        <span className='mx-4 font-medium'>Manage Tuitions</span>
                      </Link>
                      <Link
                        href='/dashboard/admin/manage-tutor-requests'
                        className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/dashboard/admin/manage-tutor-requests" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
                        }
                      >
                        <BsBookFill className='w-5 h-5' />
                        <span className='mx-4 font-medium'>Manage Tutor Requests</span>
                      </Link>
                      <Link
                        href='/dashboard/admin/manage-users'
                        className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/dashboard/admin/manage-users" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
                        }
                      >
                        <FaUserCheck className='w-5 h-5' />
                        <span className='mx-4 font-medium'>Manage Users</span>
                      </Link>
                      <Link
                        href='/dashboard/admin/payment-history-admin'
                        className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/dashboard/tutor/payment-history-tutor" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
                        }
                      >
                        <FaHistory className='w-5 h-5' />
                        <span className='mx-4 font-medium'>Payment History</span>
                      </Link>
                    </>
                  }

                </>
              </nav>)
            }
          </div>
        </div>

        <div>
          <div className="divider my-2"></div>
          <Link
            href='/dashboard'
            className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/dashboard" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
            }
          >
            <MdDashboard className='w-5 h-5' />
            <span className='mx-4 font-medium'>Dashboard</span>
          </Link>
          <Link
            href='/'
            className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
            }
          >
            <BiHome className='w-5 h-5' />
            <span className='mx-4 font-medium'>Home</span>
          </Link>
          <Link
            href='/tutors'
            className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/tutors" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
            }
          >
            <FaChalkboardTeacher className='w-5 h-5' />
            <span className='mx-4 font-medium'>Tutors</span>
          </Link>
          <Link
            href='/tutor-request'
            className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/tutor-request" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
            }
          >
            <GiTeacher className='w-5 h-5' />
            <span className='mx-4 font-medium'>Tutor Request</span>
          </Link>
          <Link
            href='/tutor-jobs'
            className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/tutor-jobs" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
            }
          >
            <GiTeacher className='w-5 h-5' />
            <span className='mx-4 font-medium'>Tutor Jobs</span>
          </Link>
          <Link
            href='/contact'
            className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/contact" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
            }
          >
            <LuContact className='w-5 h-5' />
            <span className='mx-4 font-medium'>Contact</span>
          </Link>
          <Link
            href='/about'
            className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/about" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
            }
          >
            <BiDetail className='w-5 h-5' />
            <span className='mx-4 font-medium'>About</span>
          </Link>
          <Link
            href='/blogs'
            className={`flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${pathname === "/blogs" ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
            }
          >
            <MdArticle className='w-5 h-5' />
            <span className='mx-4 font-medium'>Blogs</span>
          </Link>
          {/* <Link
            href='/profile'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 transition-colors duration-300 transform hover:bg-teal-200 hover:text-teal-700 ${isActive ? 'bg-teal-200 text-teal-700' : 'text-teal-600'}`
            }
          >
            <ImProfile className='w-5 h-5' />
            <span className='mx-4 font-medium'>Profile</span>
          </Link> */}
          <button
            className='flex w-full items-center px-4 py-2 mt-2 text-red-600 hover:bg-red-200 hover:text-red-700 transition-colors duration-300 transform' onClick={handleLogOut}
          >
            <BiLogOut className='w-5 h-5' />
            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
