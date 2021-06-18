import EmployeeData, { Employee } from '@/components/employees/EmployeeData';
import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner';
import Meta from '@/components/Meta';
import Page from '@/components/page/Page';

import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';

interface ServerResponse {
  code: number;
  message: string;
  data?: Employee;
}

const EmployeeDataPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const authCode = router.query.code;
  const {authToken} = router.query

  const [ title, setTitle ] = useState('Loading...');
  const [ subtitle, setSubtitle ] = useState('Loading employee data...');

  const [ employeeData, setEmployeeData ] = useState<null | Employee>(null);
  const [ error, setError ] = useState('');

  const loadEmployee = async () => {
    if (!id) {
      return;
    }

    const endpoint = (authCode || authToken) ? "getFull" : "get";
    let urlSuffix = `employee/${endpoint}?id=${id}`;
    if(authCode){
      urlSuffix += `&auth_code=${authCode}`;
    }

    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE_API_ENDPOINT}/${urlSuffix}`, {
        headers: authToken ? {"X-Auth-Token" : authToken.toString()} : {},
      });

      const json: ServerResponse = await res.json();

      if (json.code === 0) {
        setEmployeeData(json.data);
        const formattedName = `${json.data.firstName} ${json.data.middleName || ''} ${json.data.lastName}`;
        setTitle(formattedName);
        setSubtitle(json.data.designation);
        return;
      }

      setError(json.message ?? 'Internal Server Error');
    } catch (err) {
      console.error(err);
      setError('Internal Server Error');
    }
  };

  useEffect(() => {
    loadEmployee();
  }, [ id ]);

  return (
    <Page title={title} subtitle={subtitle}>
      <Meta
        title={title}
        description={subtitle}
        url={`/${id}`}
      />

      {!employeeData && !error && (
        <div>
          Loading...
        </div>
      )}

      {employeeData && <EmployeeData employee={employeeData} />}

      {error && error.length > 0 && (
        <div>{error}</div>
      )}
    </Page>
  );
};

export default EmployeeDataPage;
