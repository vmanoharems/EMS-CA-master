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
    using System.Collections.Generic;
    
    public partial class CRWHeader
    {
        public int BudgetCategoryID { get; set; }
        public string CategoryTotal { get; set; }
        public string CategoryNumber { get; set; }
        public Nullable<decimal> TotalCost { get; set; }
        public Nullable<decimal> PO { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string CategoryDescription { get; set; }
        public Nullable<int> BudgetID { get; set; }
        public Nullable<int> Budgetfileid { get; set; }
        public Nullable<int> COAID { get; set; }
        public int DetailLevel { get; set; }
    }
}
