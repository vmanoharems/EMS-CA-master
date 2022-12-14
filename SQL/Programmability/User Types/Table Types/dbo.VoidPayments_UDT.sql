CREATE TYPE [dbo].[VoidPayments_UDT] AS TABLE (
  [Action] [varchar](50) NOT NULL,
  [PaymentId] [int] NOT NULL,
  [GroupNumber] [nvarchar](2) NULL,
  [VendorId] [int] NULL,
  [PaidAmount] [decimal](18, 2) NULL,
  [CheckDate] [datetime] NULL,
  [CheckNumber] [nvarchar](50) NULL,
  [BankId] [int] NULL,
  [Status] [nvarchar](50) NULL,
  [PayBy] [nvarchar](50) NULL,
  [PaymentDate] [datetime] NULL,
  [Memo] [nvarchar](200) NULL,
  [BatchNumber] [nvarchar](12) NULL,
  [ProdId] [int] NULL,
  [CreatedBy] [int] NULL,
  [CreatedDate] [datetime] NULL,
  [ModifyBy] [int] NULL,
  [ModifyDate] [datetime] NULL,
  [isdeleted] [bit] NOT NULL DEFAULT (0)
)
GO