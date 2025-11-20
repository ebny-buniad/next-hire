import React, { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import { Brain } from 'lucide-react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AccountTab from './AccountTab/AccountTab';
import BillingsTab from './BillingsTab/BillingsTab';
import PlansTab from './PlansTab/PlansTab';
import { useLocation } from 'react-router';

const Settings = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const location = useLocation();
    useEffect(() => {
        const tab = location?.state?.tab;
        if (tab === "plans") {
            setTabIndex(2);
        }
        else if (tab === "billings") {
            setTabIndex(1);
        }
        else {
            setTabIndex(0);
        }
    }, [location]);
    return (
        <div className='py-15 text-gray-600'>
            <Container>
                <div className='mt-10 mb-5'>
                    <h3 className='flex items-center gap-4 text-2xl text-gray-600'><Brain size={20} />Settings</h3>
                </div>

                <div>
                    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                        {/* Tab List */}
                        <TabList className="flex border-b border-gray-200 mb-6">
                            <Tab
                                className="px-6 py-3 focus:outline-0 text-gray-600 cursor-pointer transition-all duration-300 hover:text-purple-600"
                                selectedClassName="text-purple-600 font-semibold border-b-1 border-purple-600"
                            >
                                Account
                            </Tab>
                            <Tab
                                className="px-6 py-3 focus:outline-0 text-gray-600 cursor-pointer transition-all duration-300 hover:text-purple-600"
                                selectedClassName="text-purple-600 font-semibold border-b-1 border-purple-600"
                            >
                                Billings
                            </Tab>
                            <Tab
                                className="px-6 py-3 focus:outline-0 text-gray-600 cursor-pointer transition-all duration-300 hover:text-purple-600"
                                selectedClassName="text-purple-600 font-semibold border-b-1 border-purple-600"
                            >
                                Plans
                            </Tab>
                        </TabList>

                        {/* Tab Panels */}

                        <TabPanel>
                            <AccountTab></AccountTab>
                        </TabPanel>

                        <TabPanel>
                            <div className="transition-all duration-500 ease-in-out transform">
                                <BillingsTab setTabIndex={setTabIndex}></BillingsTab>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="transition-all duration-500 ease-in-out transform">
                                <PlansTab></PlansTab>
                            </div>
                        </TabPanel>

                    </Tabs>
                </div>
            </Container>
        </div>
    );
};

export default Settings;