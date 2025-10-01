import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { FormField, TextAreaField, SelectField, CheckboxField, FormButton } from '../ui';
import { surveySchema, productFeedbackSchema } from '../../schemas/validationSchemas';
import { apiService } from '../../services/apiService';
import { useFormSubmission } from '../../hooks/useFormSubmission';
import type {
  SurveyForm as SurveyFormData,
  ProductFeedbackForm,
  Project,
  TeamMember,
  ProjectMilestone,
  WorkExperience
} from '../../types';

const SurveyForm: React.FC = () => {
  const surveyInitialValues: SurveyFormData = {
    name: '',
    email: '',
    age: 0,
    experience: 'beginner' as const,
    technologies: [],
    feedback: '',
    rating: 0,
    projects: [
      {
        id: '1',
        name: '',
        description: '',
        type: 'web' as const,
        startDate: '',
        endDate: '',
        status: 'active' as const,
        team: [
          {
            id: '1',
            name: '',
            role: '',
            email: '',
            skills: [],
          },
        ],
        milestones: [
          {
            id: '1',
            title: '',
            description: '',
            dueDate: '',
            status: 'pending' as const,
            assignedTo: [],
          },
        ],
        technologies: [],
        budget: {
          allocated: 0,
          spent: 0,
          currency: 'USD',
        },
      },
    ],
    workExperience: [
      {
        id: '1',
        companyName: '',
        position: '',
        department: '',
        location: {
          city: '',
          state: '',
          country: '',
          isRemote: false,
        },
        duration: {
          startDate: '',
          endDate: '',
          isCurrent: false,
        },
        responsibilities: [''],
        achievements: [
          {
            title: '',
            description: '',
            date: '',
          },
        ],
        technologies: [],
      },
    ],
  };

  const productFeedbackInitialValues: ProductFeedbackForm = {
    productName: '',
    category: 'software' as const,
    usageFrequency: 'weekly' as const,
    satisfaction: 0,
    features: [],
    improvements: '',
    recommendToFriend: false,
  };

  const experienceOptions = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (1-3 years)' },
    { value: 'advanced', label: 'Advanced (3+ years)' },
  ];

  const projectTypeOptions = [
    { value: 'web', label: 'Web Application' },
    { value: 'mobile', label: 'Mobile Application' },
    { value: 'desktop', label: 'Desktop Application' },
    { value: 'backend', label: 'Backend/API' },
    { value: 'other', label: 'Other' },
  ];

  const projectStatusOptions = [
    { value: 'planning', label: 'Planning' },
    { value: 'active', label: 'Active' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' },
  ];

  const milestoneStatusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'delayed', label: 'Delayed' },
  ];

  const categoryOptions = [
    { value: 'software', label: 'Software' },
    { value: 'hardware', label: 'Hardware' },
    { value: 'service', label: 'Service' },
    { value: 'other', label: 'Other' },
  ];

  const usageFrequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'rarely', label: 'Rarely' },
  ];

  const technologyOptions = [
    'React', 'Vue', 'Angular', 'Svelte',
    'JavaScript', 'TypeScript', 'Python', 'Java',
    'Node.js', 'Express', 'Next.js', 'Nuxt.js',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
  ];

  const featureOptions = [
    'User Interface', 'Performance', 'Documentation', 'Support',
    'Integration', 'Customization', 'Security', 'Mobile Support',
    'Analytics', 'Collaboration', 'Reporting', 'API Access',
  ];

  const handleSurveySubmit = useFormSubmission(apiService.submitSurvey, 'Survey');
  const handleProductFeedbackSubmit = useFormSubmission(
    (data: ProductFeedbackForm) => apiService.submitProductFeedback(data),
    'Product Feedback'
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* First Form - Developer Experience Survey */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Developer Experience Survey</h2>
        <p className="text-gray-600 mb-6">
          Help us understand your development experience and project portfolio.
        </p>

        <Formik
          initialValues={surveyInitialValues}
          validationSchema={surveySchema}
          onSubmit={handleSurveySubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-8">
              {/* Personal Information */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="name"
                    label="Full Name"
                    placeholder="Enter your full name"
                  />

                  <FormField
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <FormField
                    name="age"
                    label="Age"
                    type="number"
                    placeholder="Enter your age"
                  />

                  <SelectField
                    name="experience"
                    label="Development Experience"
                    options={experienceOptions}
                  />
                </div>
              </div>

              {/* Technologies */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Technologies</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Select all technologies you have experience with:
                </p>

                <FieldArray name="technologies">
                  {({ push, remove }) => (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {technologyOptions.map((tech) => (
                        <label key={tech} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                          <input
                            type="checkbox"
                            checked={values.technologies.includes(tech)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                push(tech);
                              } else {
                                const index = values.technologies.indexOf(tech);
                                if (index >= 0) remove(index);
                              }
                            }}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{tech}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Projects */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Projects</h3>
                <FieldArray name="projects">
                  {({ push: pushProject, remove: removeProject }) => (
                    <div className="space-y-6">
                      {values.projects.map((project: Project, projectIndex: number) => (
                        <div key={project.id} className="border-2 border-blue-200 p-6 rounded-lg bg-blue-50">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-semibold text-blue-900">
                              Project {projectIndex + 1}
                            </h4>
                            {values.projects.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeProject(projectIndex)}
                                className="text-red-600 hover:text-red-800 font-medium"
                              >
                                Remove Project
                              </button>
                            )}
                          </div>

                          {/* Project Basic Info */}
                          <div className="space-y-4 bg-white p-4 rounded-md">
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                name={`projects.${projectIndex}.name`}
                                label="Project Name"
                                placeholder="My Awesome Project"
                              />

                              <SelectField
                                name={`projects.${projectIndex}.type`}
                                label="Project Type"
                                options={projectTypeOptions}
                              />
                            </div>

                            <TextAreaField
                              name={`projects.${projectIndex}.description`}
                              label="Project Description"
                              placeholder="Describe your project..."
                              rows={3}
                            />

                            <div className="grid grid-cols-3 gap-4">
                              <FormField
                                name={`projects.${projectIndex}.startDate`}
                                label="Start Date"
                                type="date"
                              />

                              <FormField
                                name={`projects.${projectIndex}.endDate`}
                                label="End Date"
                                type="date"
                              />

                              <SelectField
                                name={`projects.${projectIndex}.status`}
                                label="Status"
                                options={projectStatusOptions}
                              />
                            </div>

                            {/* Technologies for Project */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Project Technologies
                              </label>
                              <FieldArray name={`projects.${projectIndex}.technologies`}>
                                {({ push, remove }) => (
                                  <div className="grid grid-cols-4 gap-2">
                                    {technologyOptions.map((tech) => (
                                      <label key={tech} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                                        <input
                                          type="checkbox"
                                          checked={project.technologies.includes(tech)}
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              push(tech);
                                            } else {
                                              const index = project.technologies.indexOf(tech);
                                              if (index >= 0) remove(index);
                                            }
                                          }}
                                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-xs text-gray-700">{tech}</span>
                                      </label>
                                    ))}
                                  </div>
                                )}
                              </FieldArray>
                            </div>

                            {/* Budget */}
                            <div className="border-t pt-4">
                              <h5 className="font-medium text-gray-700 mb-3">Budget</h5>
                              <div className="grid grid-cols-3 gap-4">
                                <FormField
                                  name={`projects.${projectIndex}.budget.allocated`}
                                  label="Allocated Budget"
                                  type="number"
                                  placeholder="10000"
                                />

                                <FormField
                                  name={`projects.${projectIndex}.budget.spent`}
                                  label="Spent Budget"
                                  type="number"
                                  placeholder="5000"
                                />

                                <FormField
                                  name={`projects.${projectIndex}.budget.currency`}
                                  label="Currency"
                                  placeholder="USD"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Team Members */}
                          <div className="mt-4 bg-white p-4 rounded-md">
                            <h5 className="font-medium text-gray-700 mb-3">Team Members</h5>
                            <FieldArray name={`projects.${projectIndex}.team`}>
                              {({ push: pushTeamMember, remove: removeTeamMember }) => (
                                <div className="space-y-3">
                                  {project.team.map((member: TeamMember, memberIndex: number) => (
                                    <div key={member.id} className="border border-gray-200 p-3 rounded-md bg-gray-50">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">
                                          Member {memberIndex + 1}
                                        </span>
                                        {project.team.length > 1 && (
                                          <button
                                            type="button"
                                            onClick={() => removeTeamMember(memberIndex)}
                                            className="text-red-600 hover:text-red-800 text-xs"
                                          >
                                            Remove
                                          </button>
                                        )}
                                      </div>

                                      <div className="grid grid-cols-3 gap-3">
                                        <FormField
                                          name={`projects.${projectIndex}.team.${memberIndex}.name`}
                                          label="Name"
                                          placeholder="John Doe"
                                        />

                                        <FormField
                                          name={`projects.${projectIndex}.team.${memberIndex}.role`}
                                          label="Role"
                                          placeholder="Developer"
                                        />

                                        <FormField
                                          name={`projects.${projectIndex}.team.${memberIndex}.email`}
                                          label="Email"
                                          type="email"
                                          placeholder="john@example.com"
                                        />
                                      </div>

                                      <div className="mt-2">
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                          Skills (comma-separated)
                                        </label>
                                        <input
                                          type="text"
                                          value={member.skills.join(', ')}
                                          onChange={(e) => {
                                            const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                                            setFieldValue(
                                              `projects.${projectIndex}.team.${memberIndex}.skills`,
                                              skills
                                            );
                                          }}
                                          placeholder="React, TypeScript, Node.js"
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>
                                    </div>
                                  ))}

                                  <button
                                    type="button"
                                    onClick={() => pushTeamMember({
                                      id: Date.now().toString(),
                                      name: '',
                                      role: '',
                                      email: '',
                                      skills: [],
                                    })}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                  >
                                    + Add Team Member
                                  </button>
                                </div>
                              )}
                            </FieldArray>
                          </div>

                          {/* Milestones */}
                          <div className="mt-4 bg-white p-4 rounded-md">
                            <h5 className="font-medium text-gray-700 mb-3">Milestones</h5>
                            <FieldArray name={`projects.${projectIndex}.milestones`}>
                              {({ push: pushMilestone, remove: removeMilestone }) => (
                                <div className="space-y-3">
                                  {project.milestones.map((milestone: ProjectMilestone, milestoneIndex: number) => (
                                    <div key={milestone.id} className="border border-gray-200 p-3 rounded-md bg-gray-50">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">
                                          Milestone {milestoneIndex + 1}
                                        </span>
                                        {project.milestones.length > 1 && (
                                          <button
                                            type="button"
                                            onClick={() => removeMilestone(milestoneIndex)}
                                            className="text-red-600 hover:text-red-800 text-xs"
                                          >
                                            Remove
                                          </button>
                                        )}
                                      </div>

                                      <div className="grid grid-cols-2 gap-3">
                                        <FormField
                                          name={`projects.${projectIndex}.milestones.${milestoneIndex}.title`}
                                          label="Title"
                                          placeholder="MVP Launch"
                                        />

                                        <FormField
                                          name={`projects.${projectIndex}.milestones.${milestoneIndex}.dueDate`}
                                          label="Due Date"
                                          type="date"
                                        />
                                      </div>

                                      <div className="mt-2">
                                        <TextAreaField
                                          name={`projects.${projectIndex}.milestones.${milestoneIndex}.description`}
                                          label="Description"
                                          placeholder="Describe the milestone..."
                                          rows={2}
                                        />
                                      </div>

                                      <div className="grid grid-cols-2 gap-3 mt-2">
                                        <SelectField
                                          name={`projects.${projectIndex}.milestones.${milestoneIndex}.status`}
                                          label="Status"
                                          options={milestoneStatusOptions}
                                        />

                                        <div>
                                          <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Assigned To (team member names, comma-separated)
                                          </label>
                                          <input
                                            type="text"
                                            value={milestone.assignedTo.join(', ')}
                                            onChange={(e) => {
                                              const assigned = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                                              setFieldValue(
                                                `projects.${projectIndex}.milestones.${milestoneIndex}.assignedTo`,
                                                assigned
                                              );
                                            }}
                                            placeholder="John, Jane"
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ))}

                                  <button
                                    type="button"
                                    onClick={() => pushMilestone({
                                      id: Date.now().toString(),
                                      title: '',
                                      description: '',
                                      dueDate: '',
                                      status: 'pending' as const,
                                      assignedTo: [],
                                    })}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                  >
                                    + Add Milestone
                                  </button>
                                </div>
                              )}
                            </FieldArray>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => pushProject({
                          id: Date.now().toString(),
                          name: '',
                          description: '',
                          type: 'web' as const,
                          startDate: '',
                          endDate: '',
                          status: 'active' as const,
                          team: [{
                            id: Date.now().toString(),
                            name: '',
                            role: '',
                            email: '',
                            skills: [],
                          }],
                          milestones: [{
                            id: Date.now().toString(),
                            title: '',
                            description: '',
                            dueDate: '',
                            status: 'pending' as const,
                            assignedTo: [],
                          }],
                          technologies: [],
                          budget: {
                            allocated: 0,
                            spent: 0,
                            currency: 'USD',
                          },
                        })}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        + Add Another Project
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Work Experience */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Work Experience</h3>
                <FieldArray name="workExperience">
                  {({ push: pushExperience, remove: removeExperience }) => (
                    <div className="space-y-6">
                      {values.workExperience.map((experience: WorkExperience, expIndex: number) => (
                        <div key={experience.id} className="border-2 border-green-200 p-6 rounded-lg bg-green-50">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-semibold text-green-900">
                              Experience {expIndex + 1}
                            </h4>
                            {values.workExperience.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeExperience(expIndex)}
                                className="text-red-600 hover:text-red-800 font-medium"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="space-y-4 bg-white p-4 rounded-md">
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                name={`workExperience.${expIndex}.companyName`}
                                label="Company Name"
                                placeholder="Tech Corp"
                              />

                              <FormField
                                name={`workExperience.${expIndex}.position`}
                                label="Position"
                                placeholder="Senior Developer"
                              />
                            </div>

                            <FormField
                              name={`workExperience.${expIndex}.department`}
                              label="Department"
                              placeholder="Engineering"
                            />

                            {/* Location */}
                            <div className="border-t pt-4">
                              <h5 className="font-medium text-gray-700 mb-3">Location</h5>
                              <div className="grid grid-cols-3 gap-4">
                                <FormField
                                  name={`workExperience.${expIndex}.location.city`}
                                  label="City"
                                  placeholder="San Francisco"
                                />

                                <FormField
                                  name={`workExperience.${expIndex}.location.state`}
                                  label="State"
                                  placeholder="CA"
                                />

                                <FormField
                                  name={`workExperience.${expIndex}.location.country`}
                                  label="Country"
                                  placeholder="USA"
                                />
                              </div>

                              <div className="mt-2">
                                <CheckboxField
                                  name={`workExperience.${expIndex}.location.isRemote`}
                                  label="Remote Position"
                                />
                              </div>
                            </div>

                            {/* Duration */}
                            <div className="border-t pt-4">
                              <h5 className="font-medium text-gray-700 mb-3">Duration</h5>
                              <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  name={`workExperience.${expIndex}.duration.startDate`}
                                  label="Start Date"
                                  type="date"
                                />

                                <FormField
                                  name={`workExperience.${expIndex}.duration.endDate`}
                                  label="End Date"
                                  type="date"
                                />
                              </div>

                              <div className="mt-2">
                                <CheckboxField
                                  name={`workExperience.${expIndex}.duration.isCurrent`}
                                  label="Current Position"
                                />
                              </div>
                            </div>

                            {/* Responsibilities */}
                            <div className="border-t pt-4">
                              <h5 className="font-medium text-gray-700 mb-3">Responsibilities</h5>
                              <FieldArray name={`workExperience.${expIndex}.responsibilities`}>
                                {({ push, remove }) => (
                                  <div className="space-y-2">
                                    {experience.responsibilities.map((_, respIndex: number) => (
                                      <div key={respIndex} className="flex gap-2">
                                        <FormField
                                          name={`workExperience.${expIndex}.responsibilities.${respIndex}`}
                                          label={`Responsibility ${respIndex + 1}`}
                                          placeholder="Led team of 5 developers..."
                                        />
                                        {experience.responsibilities.length > 1 && (
                                          <button
                                            type="button"
                                            onClick={() => remove(respIndex)}
                                            className="text-red-600 hover:text-red-800 text-sm mt-6"
                                          >
                                            Remove
                                          </button>
                                        )}
                                      </div>
                                    ))}
                                    <button
                                      type="button"
                                      onClick={() => push('')}
                                      className="text-green-600 hover:text-green-800 text-sm font-medium"
                                    >
                                      + Add Responsibility
                                    </button>
                                  </div>
                                )}
                              </FieldArray>
                            </div>

                            {/* Achievements */}
                            <div className="border-t pt-4">
                              <h5 className="font-medium text-gray-700 mb-3">Achievements</h5>
                              <FieldArray name={`workExperience.${expIndex}.achievements`}>
                                {({ push, remove }) => (
                                  <div className="space-y-3">
                                    {experience.achievements.map((_, achIndex: number) => (
                                      <div key={achIndex} className="border border-gray-200 p-3 rounded-md bg-gray-50">
                                        <div className="flex justify-between items-center mb-2">
                                          <span className="text-sm font-medium text-gray-700">
                                            Achievement {achIndex + 1}
                                          </span>
                                          {experience.achievements.length > 1 && (
                                            <button
                                              type="button"
                                              onClick={() => remove(achIndex)}
                                              className="text-red-600 hover:text-red-800 text-xs"
                                            >
                                              Remove
                                            </button>
                                          )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                          <FormField
                                            name={`workExperience.${expIndex}.achievements.${achIndex}.title`}
                                            label="Title"
                                            placeholder="Increased performance by 50%"
                                          />

                                          <FormField
                                            name={`workExperience.${expIndex}.achievements.${achIndex}.date`}
                                            label="Date"
                                            type="date"
                                          />
                                        </div>

                                        <div className="mt-2">
                                          <TextAreaField
                                            name={`workExperience.${expIndex}.achievements.${achIndex}.description`}
                                            label="Description"
                                            placeholder="Describe the achievement..."
                                            rows={2}
                                          />
                                        </div>
                                      </div>
                                    ))}

                                    <button
                                      type="button"
                                      onClick={() => push({
                                        title: '',
                                        description: '',
                                        date: '',
                                      })}
                                      className="text-green-600 hover:text-green-800 text-sm font-medium"
                                    >
                                      + Add Achievement
                                    </button>
                                  </div>
                                )}
                              </FieldArray>
                            </div>

                            {/* Technologies */}
                            <div className="border-t pt-4">
                              <h5 className="font-medium text-gray-700 mb-3">Technologies Used</h5>
                              <FieldArray name={`workExperience.${expIndex}.technologies`}>
                                {({ push, remove }) => (
                                  <div className="grid grid-cols-4 gap-2">
                                    {technologyOptions.map((tech) => (
                                      <label key={tech} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                                        <input
                                          type="checkbox"
                                          checked={experience.technologies.includes(tech)}
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              push(tech);
                                            } else {
                                              const index = experience.technologies.indexOf(tech);
                                              if (index >= 0) remove(index);
                                            }
                                          }}
                                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                        />
                                        <span className="text-xs text-gray-700">{tech}</span>
                                      </label>
                                    ))}
                                  </div>
                                )}
                              </FieldArray>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => pushExperience({
                          id: Date.now().toString(),
                          companyName: '',
                          position: '',
                          department: '',
                          location: {
                            city: '',
                            state: '',
                            country: '',
                            isRemote: false,
                          },
                          duration: {
                            startDate: '',
                            endDate: '',
                            isCurrent: false,
                          },
                          responsibilities: [''],
                          achievements: [{
                            title: '',
                            description: '',
                            date: '',
                          }],
                          technologies: [],
                        })}
                        className="text-green-600 hover:text-green-800 font-medium"
                      >
                        + Add Work Experience
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Feedback */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Feedback</h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Overall Rating (1-5)
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setFieldValue('rating', rating)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                          values.rating >= rating
                            ? 'bg-yellow-400 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <TextAreaField
                  name="feedback"
                  label="Additional Feedback"
                  placeholder="Share your thoughts, suggestions, or experiences..."
                  rows={4}
                />
              </div>

              {/* Submit */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Your responses help improve our services
                </p>

                <div className="flex space-x-3">
                  <FormButton type="button" variant="secondary">
                    Save Draft
                  </FormButton>
                  <FormButton type="submit">
                    Submit Survey
                  </FormButton>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Second Form - Product Feedback */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Feedback Form</h2>
        <p className="text-gray-600 mb-6">
          Share your experience with our products and help us improve.
        </p>

        <Formik
          initialValues={productFeedbackInitialValues}
          validationSchema={productFeedbackSchema}
          onSubmit={handleProductFeedbackSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6">
              {/* Product Information */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    name="productName"
                    label="Product Name"
                    placeholder="Enter the product name"
                  />

                  <SelectField
                    name="category"
                    label="Product Category"
                    options={categoryOptions}
                  />
                </div>

                <div className="mt-4">
                  <SelectField
                    name="usageFrequency"
                    label="How often do you use this product?"
                    options={usageFrequencyOptions}
                  />
                </div>
              </div>

              {/* Features */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Which features do you find most valuable?
                </p>

                <FieldArray name="features">
                  {({ push, remove }) => (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {featureOptions.map((feature) => (
                        <label key={feature} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                          <input
                            type="checkbox"
                            checked={values.features.includes(feature)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                push(feature);
                              } else {
                                const index = values.features.indexOf(feature);
                                if (index >= 0) remove(index);
                              }
                            }}
                            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Satisfaction & Feedback */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Your Experience</h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Satisfaction Rating (1-10)
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setFieldValue('satisfaction', rating)}
                        className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium transition-colors ${
                          values.satisfaction >= rating
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>

                <TextAreaField
                  name="improvements"
                  label="Suggested Improvements"
                  placeholder="What improvements would you like to see?"
                  rows={3}
                />

                <div className="mt-4">
                  <CheckboxField
                    name="recommendToFriend"
                    label="I would recommend this product to a friend"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Thank you for helping us improve our products
                </p>

                <div className="flex space-x-3">
                  <FormButton type="button" variant="secondary">
                    Clear Form
                  </FormButton>
                  <FormButton type="submit">
                    Submit Feedback
                  </FormButton>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SurveyForm;
