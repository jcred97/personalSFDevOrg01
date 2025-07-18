import { LightningElement } from 'lwc';

export default class SortableTableHTML extends LightningElement {
    viewHorizontal = false;
    viewVertical = true;
    hasCaseList = true;
    caseList = [
        {   
            AssingedTo  :   "Donlee Malacad",
            CaseNumber  :   "00001275",
            CaseSubject :   "Test",
            CreatedDate :   "2023-05-04T23:07:01.000Z",
            CreatedDateFormatted    :    "09:07 AM 05 May 2023",
            CreatedDateFormattedMobile  : "09:07 AM 05 May",
            Id          :   "5000T000003xAJiQAM",
            ModifiedDateFormatted : "10:17 AM 05 June 2023",
            ModifiedDateFormattedMobile : "10:17 AM 05 June",
            Priority    :   "Very Low",
            Status      :   "Under Review",
            assigneeAbbr:   "DM",
            dataLink    :   "/ticket-detail?recordId=5000T000003xAJiQAM",
            pillSeverityCss :   "table-pill pill-yellow"
        },
        {   
            AssingedTo  :   "Service Case",
            CaseNumber  :   "00001303",
            CaseSubject :   "TestJC",
            CreatedDate :   "2023-11-21T02:53:28.000Z",
            CreatedDateFormatted    :    "01:53 PM 21 November 2023",
            CreatedDateFormattedMobile  : "01:53 PM 21 November",
            Id          :   "5000T000004z8n2QAA",
            ModifiedDateFormatted : "01:55 PM 21 November 2023",
            ModifiedDateFormattedMobile : "01:55 PM 21 November",
            Priority    :   "Medium",
            Status      :   "New",
            assigneeAbbr:   "SC",
            dataLink    :   "/ticket-detail?recordId=5000T000004z8n2QAA",
            pillSeverityCss :   "table-pill pill-orange"
        },
        {
            AssingedTo  :   "John Carlo Red",
            CaseNumber  :   "00001304",
            CaseSubject :   "TestJC2",
            CreatedDate :   "2023-11-21T03:07:07.000Z",
            CreatedDateFormatted    :    "02:07 PM 21 November 2023",
            CreatedDateFormattedMobile  : "02:07 PM 21 November",
            Id          :   "5000T000004z8qFQAQ",
            ModifiedDateFormatted : "02:07 PM 21 November 2023",
            ModifiedDateFormattedMobile : "02:07 PM 21 November",
            Priority    :   "Very High",
            Status      :   "New",
            assigneeAbbr:   "JR",
            dataLink    :   "/ticket-detail?recordId=5000T000004z8qFQAQ",
            pillSeverityCss :   "table-pill pill-red"
        }
    ];

    sortDirection = {
        Priority : 'desc',
        Status : 'desc',
        CaseNumber : 'desc',
        CaseSubject : 'desc',
        assigneeAbbr : 'desc',
        CreatedDateFormatted : 'desc',
        ModifiedDateFormatted : 'desc'
    };

    arrowUpPriority = false;
    arrowUpStatus = false;
    arrowUpCaseNumber = false;
    arrowUpCaseSubject = false;
    arrowUpassigneeAbbr = false;
    arrowUpCreatedDateFormatted = false;
    arrowUpModifiedDateFormatted = false;

    arrowDownPriority = false;
    arrowDownStatus= false;
    arrowDownCaseNumber = false;
    arrowDownCaseSubject = false;
    arrowDownassigneeAbbr = false;
    arrowDownCreatedDateFormatted = false;
    arrowDownModifiedDateFormatted = false;

    casePriority = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];

    setHorizontalActive() {
        this.viewHorizontal = true;
        this.viewVertical = false;
    }

    setVerticalActive() {
        this.viewHorizontal = false;
        this.viewVertical = true;
    }

    handleSortTableNewFeature(event){
        let caseProperty = event.currentTarget.dataset.id;
        let caseListCopy = JSON.parse(JSON.stringify(this.caseList));
        let sortDirectionCopy = JSON.parse(JSON.stringify(this.sortDirection));

        console.log('caseList -->', this.caseList);

        const sorter = (a, b) => {
            if(sortDirectionCopy[caseProperty] == 'desc'){
                this.sortDirection = sortDirectionCopy;
                this.handleArrowFunction(caseProperty, sortDirectionCopy);

                if(caseProperty == 'CreatedDateFormatted' ||  caseProperty == 'ModifiedDateFormatted') {
                    return Date.parse(a[caseProperty]) < Date.parse(b[caseProperty]) ? -1 : 1;
                } 
                else if (caseProperty == 'Priority') {
                    return this.casePriority.indexOf(a[caseProperty]) > this.casePriority.indexOf(b[caseProperty]) ? 1 : -1;
                }
                else {
                    return a[caseProperty] < b[caseProperty] ? -1 : 1;
                }
                
            }
            
            else {
                this.sortDirection = sortDirectionCopy;
                this.handleArrowFunction(caseProperty, sortDirectionCopy);

                if(caseProperty == 'CreatedDateFormatted' ||  caseProperty == 'ModifiedDateFormatted') {
                    return Date.parse(a[caseProperty]) > Date.parse(b[caseProperty]) ? -1 : 1;
                } 
                else if (caseProperty == 'Priority') {
                    return this.casePriority.indexOf(a[caseProperty] > this.casePriority.indexOf(b[caseProperty])) ? -1 : 1;
                }
                else {
                    return a[caseProperty] > b[caseProperty] ? -1 : 1;
                }
            }            
        }
        sortDirectionCopy[caseProperty] = sortDirectionCopy[caseProperty] == 'desc' ? 'asc': 'desc';
        this.caseList = caseListCopy.sort(sorter);
    }

    handleArrowFunction = (caseProperty, sortDirectionCopy) => {
        if(sortDirectionCopy[caseProperty] == 'desc'){
            this.arrowDownPriority = false;
            this.arrowDownStatus= false;
            this.arrowDownCaseNumber = false;
            this.arrowDownCaseSubject = false;
            this.arrowDownassigneeAbbr = false;
            this.arrowDownCreatedDateFormatted = false;
            this.arrowDownModifiedDateFormatted = false;
            
            switch(caseProperty){
                case 'Priority':
                    this.arrowUpPriority = true;
                    this.arrowUpStatus = false;
                    this.arrowUpCaseNumber = false;
                    this.arrowUpCaseSubject = false;
                    this.arrowUpassigneeAbbr = false;
                    this.arrowUpCreatedDateFormatted = false;
                    this.arrowUpModifiedDateFormatted = false;
                    break;

                case 'Status':
                    this.arrowUpPriority = false;
                    this.arrowUpStatus = true;
                    this.arrowUpCaseNumber = false;
                    this.arrowUpCaseSubject = false;
                    this.arrowUpassigneeAbbr = false;
                    this.arrowUpCreatedDateFormatted = false;
                    this.arrowUpModifiedDateFormatted = false;
                    break;

                case 'CaseNumber':
                    this.arrowUpPriority = false;
                    this.arrowUpStatus = false;
                    this.arrowUpCaseNumber = true;
                    this.arrowUpCaseSubject = false;
                    this.arrowUpassigneeAbbr = false;
                    this.arrowUpCreatedDateFormatted = false;
                    this.arrowUpModifiedDateFormatted = false;
                    break;

                case 'CaseSubject':
                    this.arrowUpPriority = false;
                    this.arrowUpStatus = false;
                    this.arrowUpCaseNumber = false;
                    this.arrowUpCaseSubject = true;
                    this.arrowUpassigneeAbbr = false;
                    this.arrowUpCreatedDateFormatted = false;
                    this.arrowUpModifiedDateFormatted = false;
                    break;
                
                case 'assigneeAbbr':
                    this.arrowUpPriority = false;
                    this.arrowUpStatus = false;
                    this.arrowUpCaseNumber = false;
                    this.arrowUpCaseSubject = false;
                    this.arrowUpassigneeAbbr = true;
                    this.arrowUpCreatedDateFormatted = false;
                    this.arrowUpModifiedDateFormatted = false;
                    break;

                case 'CreatedDateFormatted':
                    this.arrowUpPriority = false;
                    this.arrowUpStatus = false;
                    this.arrowUpCaseNumber = false;
                    this.arrowUpCaseSubject = false;
                    this.arrowUpassigneeAbbr = false;
                    this.arrowUpCreatedDateFormatted = true;
                    this.arrowUpModifiedDateFormatted = false;
                    break;
                
                case 'ModifiedDateFormatted':
                    this.arrowUpPriority = false;
                    this.arrowUpStatus = false;
                    this.arrowUpCaseNumber = false;
                    this.arrowUpCaseSubject = false;
                    this.arrowUpassigneeAbbr = false;
                    this.arrowUpCreatedDateFormatted = false;
                    this.arrowUpModifiedDateFormatted = true;
                    break;
            }

        } 
        else {
            this.arrowUpPriority = false;
            this.arrowUpStatus = false;
            this.arrowUpCaseNumber = false;
            this.arrowUpCaseSubject = false;
            this.arrowUpassigneeAbbr = false;
            this.arrowUpCreatedDateFormatted = false;
            this.arrowUpModifiedDateFormatted = false;

            switch(caseProperty){
                case 'Priority':
                    this.arrowDownPriority = true;
                    this.arrowDownStatus= false;
                    this.arrowDownCaseNumber = false;
                    this.arrowDownCaseSubject = false;
                    this.arrowDownassigneeAbbr = false;
                    this.arrowDownCreatedDateFormatted = false;
                    this.arrowDownModifiedDateFormatted = false;
                    break;
    
                case 'Status':
                    this.arrowDownPriority = false;
                    this.arrowDownStatus= true;
                    this.arrowDownCaseNumber = false;
                    this.arrowDownCaseSubject = false;
                    this.arrowDownassigneeAbbr = false;
                    this.arrowDownCreatedDateFormatted = false;
                    this.arrowDownModifiedDateFormatted = false;
                    break;
    
                case 'CaseNumber':
                    this.arrowDownPriority = false;
                    this.arrowDownStatus= false;
                    this.arrowDownCaseNumber = true;
                    this.arrowDownCaseSubject = false;
                    this.arrowDownassigneeAbbr = false;
                    this.arrowDownCreatedDateFormatted = false;
                    this.arrowDownModifiedDateFormatted = false;
                    break;
    
                case 'CaseSubject':
                    this.arrowDownPriority = false;
                    this.arrowDownStatus= false;
                    this.arrowDownCaseNumber = false;
                    this.arrowDownCaseSubject = true;
                    this.arrowDownassigneeAbbr = false;
                    this.arrowDownCreatedDateFormatted = false;
                    this.arrowDownModifiedDateFormatted = false;
                    break;
                
                case 'assigneeAbbr':
                    this.arrowDownPriority = false;
                    this.arrowDownStatus= false;
                    this.arrowDownCaseNumber = false;
                    this.arrowDownCaseSubject = false;
                    this.arrowDownassigneeAbbr = true;
                    this.arrowDownCreatedDateFormatted = false;
                    this.arrowDownModifiedDateFormatted = false;
                    break;
    
                case 'CreatedDateFormatted':
                    this.arrowDownPriority = false;
                    this.arrowDownStatus= false;
                    this.arrowDownCaseNumber = false;
                    this.arrowDownCaseSubject = false;
                    this.arrowDownassigneeAbbr = false;
                    this.arrowDownCreatedDateFormatted = true;
                    this.arrowDownModifiedDateFormatted = false;
                    break;
                
                case 'ModifiedDateFormatted':
                    this.arrowDownPriority = false;
                    this.arrowDownStatus= false;
                    this.arrowDownCaseNumber = false;
                    this.arrowDownCaseSubject = false;
                    this.arrowDownassigneeAbbr = false;
                    this.arrowDownCreatedDateFormatted = false;
                    this.arrowDownModifiedDateFormatted = true;
                    break;
            }
        }
    }

}