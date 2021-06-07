import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';

import clsx from 'clsx';

import LoadingSpinner from '../loading-spinner/LoadingSpinner';

export type EmployeeMaritalStatus = 'Single'
| 'Married'
| 'Widowed'
| 'Divorced'
| 'Separated'
| 'Domestic partnership'
| 'Complicated';

const MARITAL_STATUSES: EmployeeMaritalStatus[] = [
  'Single',
  'Married',
  'Widowed',
  'Divorced',
  'Separated',
  'Domestic partnership',
  'Complicated'
]

export type EmployeeDepartment = 'Development'
| 'General'
| 'Operations';

const DEPARTMENTS: EmployeeDepartment[] ={
  'Development' : 'D',
  'Human Resource' : 'H',
  'Accounts' : 'A',
  'Business' : 'B',
  'marketing' : 'M',
  'Operations' : 'O',
  'General' : 'G',
  'Legal' : 'L'
}

export interface EmployeeDataFormFields {
  firstName: string;
  middleName?: string;
  lastName: string;
  identification: string;
  id: string;
  department: string;
  mobile: string;
  email: string;
  bloodGroup: string;
  dob: string;
  joiningDate: string;
  maritalStatus: EmployeeMaritalStatus;
  address: string;
  designation: string;
  photo: File | null;
  idScan: File | null;

  authCode: string;
}

export interface EmployeeDataServerResponse {
  code: number;
  message: string;
  data?: {
    employee_id?: string;
    unique_id?: string;
  };
}

export interface EmployeeFormParams {
  send(fields: EmployeeDataFormFields): Promise<EmployeeDataServerResponse>;
}

const EmployeeForm = ({ send }: EmployeeFormParams) => {
  const [ employeeData, setEmployeeData ] = useState<EmployeeDataFormFields>({
    firstName: '',
    middleName: '',
    lastName: '',
    identification: '',
    id: '',
    department: '',
    mobile: '',
    email: '',
    bloodGroup: '',
    dob: '',
    joiningDate: '',
    maritalStatus: 'Single',
    address: '',
    designation: '',
    photo: null,
    idScan: null,

    authCode: ''
  });

  const [ error, setError ] = useState('');
  const [ sending, setSending ] = useState(false);

  const [ jiggle, setJiggle ] = useState(false);

  const router = useRouter();

  const update = (field: string) => {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setEmployeeData({
      ...employeeData,
      [`${field}`]: (e.currentTarget instanceof HTMLInputElement && e.currentTarget.files?.length)
        ? e.currentTarget.files[0]
        : e.currentTarget.value
    });
  };

  const jiggleForm = () => {
    setJiggle(true);

    setTimeout(() => {
      setJiggle(false);
    }, 500);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSending(true);
    setError('');

    try {
      const res = await send(employeeData);
      setSending(false);

      if (res.code === 0) {
        router.push(`/employees/${res.data.employee_id}`);
        return;
      }

      setError(res.message ?? 'Internal Server Error');
    } catch (err) {
      console.error(err);
      setError('Internal Server Error');
    }

    jiggleForm();
    setSending(false);
  };

  const inputs = Object.keys(employeeData)
    .map(field => {
      if (field === 'maritalStatus') {
        return (
          <div className="input-group" key={field}>
            <label htmlFor={field}>{field}:</label>
            <select
              name={field}
              id={field}
              disabled={sending}
              onChange={update(field)}
            >
              {MARITAL_STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        );
      }

      if (field === 'department') {
        return (
          <div className="input-group" key={field}>
            <label htmlFor={field}>{field}:</label>
            <select
              name={field}
              id={field}
              disabled={sending}
              onChange={update(field)}
            >
              {Object.entries(DEPARTMENTS).map(([k, v]) => (
                <option key={v} value={v}>{k}</option>
              ))}
            </select>
          </div>
        );
      }

      if ([ 'photo', 'idScan' ].includes(field)) {
        return (
          <div className="input-group" key={field}>
            <label htmlFor={field}>{field}</label>
            <input
              type="file"
              multiple={false}
              name={field}
              id={field}
              disabled={sending}
              onChange={update(field)}
            />
          </div>
        );
      }

      const inputType = [ 'dob', 'joiningDate' ].includes(field)
        ? 'date'
        : field === 'authCode' ? 'password' : 'text';

      return (
        <div className="input-group" key={field}>
          <label htmlFor={field}>{field}</label>
          <input
            type={inputType}
            name={field}
            id={field}
            disabled={sending}
            onChange={update(field)}
          />
        </div>
      );
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className={clsx({ jiggle })}>
        {inputs}

        <div className="input-group buttons">
          <button type="submit" className="single-button" disabled={sending}>Submit</button>
          {sending && <LoadingSpinner color="#fff" />}
          {error.length > 0 && <small className="form-error">{error}</small>}
        </div>
      </div>
    </form>
  );
};

export default EmployeeForm;
