//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EMS.Entity
{
    using System;
    
    public partial class APVendorsTaxFilingTransactionDetails_GET_Result
    {
        public string AuditStatus { get; set; }
        public Nullable<System.DateTime> PaymentDate { get; set; }
        public int isCheck { get; set; }
        public string PaymentNumber { get; set; }
        public string InvoiceNumber { get; set; }
        public Nullable<int> TransactionYear { get; set; }
        public string WorkState { get; set; }
        public Nullable<int> CompanyID { get; set; }
        public int JournalEntryID { get; set; }
        public string Source { get; set; }
        public string Description { get; set; }
        public string ReferenceNumber { get; set; }
        public string BatchNumber { get; set; }
        public int ProdID { get; set; }
        public string SourceTable { get; set; }
        public string CurrentStatus { get; set; }
        public int JournalEntryDetailID { get; set; }
        public int COAID { get; set; }
        public string AccountCode { get; set; }
        public decimal DebitAmount { get; set; }
        public decimal CreditAmount { get; set; }
        public Nullable<int> VendorID { get; set; }
        public string TaxCode { get; set; }
        public string Note { get; set; }
    }
}