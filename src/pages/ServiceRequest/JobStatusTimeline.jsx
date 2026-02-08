import React from 'react';

const JobStatusTimeline = () => {
  // Mock job data
  const jobs = [
    {
      id: 1,
      title: 'Kitchen Sink Repair',
      artisan: 'John Smith',
      status: 'completed',
      date: '2024-01-15',
      timeline: [
        { status: 'requested', date: '2024-01-10', description: 'Service request submitted' },
        { status: 'accepted', date: '2024-01-11', description: 'Artisan accepted the job' },
        { status: 'scheduled', date: '2024-01-12', description: 'Appointment scheduled for Jan 15' },
        { status: 'in-progress', date: '2024-01-15', description: 'Work started' },
        { status: 'completed', date: '2024-01-15', description: 'Job completed successfully' }
      ]
    },
    {
      id: 2,
      title: 'Electrical Outlet Installation',
      artisan: 'Sarah Johnson',
      status: 'in-progress',
      date: '2024-01-20',
      timeline: [
        { status: 'requested', date: '2024-01-18', description: 'Service request submitted' },
        { status: 'accepted', date: '2024-01-19', description: 'Artisan accepted the job' },
        { status: 'scheduled', date: '2024-01-19', description: 'Appointment scheduled for Jan 20' },
        { status: 'in-progress', date: '2024-01-20', description: 'Work in progress' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'scheduled': return 'bg-yellow-500';
      case 'accepted': return 'bg-purple-500';
      case 'requested': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'scheduled': return 'Scheduled';
      case 'accepted': return 'Accepted';
      case 'requested': return 'Requested';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Jobs</h1>

        {jobs.map(job => (
          <div key={job.id} className="bg-white shadow rounded-lg mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                  <p className="text-gray-600">Artisan: {job.artisan}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(job.status)}`}>
                  {getStatusText(job.status)}
                </span>
              </div>
            </div>

            <div className="px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Timeline</h3>
              <div className="space-y-4">
                {job.timeline.map((event, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`shrink-0 w-4 h-4 rounded-full ${getStatusColor(event.status)} mt-1`}></div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{getStatusText(event.status)}</p>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      <p className="text-xs text-gray-500">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobStatusTimeline;