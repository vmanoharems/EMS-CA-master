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
    
    public partial class GetDetailAccountNoParent_Result
    {
        public Nullable<int> AccountID { get; set; }
        public string AccountCode { get; set; }
        public string AccountName { get; set; }
        public Nullable<bool> BalanceSheet { get; set; }
        public Nullable<bool> Status { get; set; }
        public Nullable<bool> Posting { get; set; }
        public Nullable<int> SubLevel { get; set; }
        public Nullable<int> AccountTypeId { get; set; }
        public Nullable<int> ParentId { get; set; }
        public string ParentCode { get; set; }
        public string path { get; set; }
        public Nullable<decimal> x { get; set; }
    }
}
