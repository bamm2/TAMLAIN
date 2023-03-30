import numpy as np
import pandas as pd
from scipy.sparse import coo_matrix
from tabulate import tabulate

survey = pd.read_pickle('survey.pkl')
place = pd.read_pickle('place.pkl')
course = pd.read_pickle('course.pkl')

# course = course.groupby('일정id')['장소id'].apply(list).reset_index(name='장소list')
# print(course)

course_list = course.groupby('일정id')['장소id'].apply(list).values.tolist()
# print(course_list)

course_list.extend(100*[course_list[0]])

from mlxtend.preprocessing import TransactionEncoder

my_transactionencoder = TransactionEncoder()

# fit the transaction encoder using the list of transaction tuples
my_transactionencoder.fit(course_list)

# transform the list of transaction tuples into an array of encoded transactions
encoded_transactions = my_transactionencoder.transform(course_list)

# convert the array of encoded transactions into a dataframe
encoded_transactions_df = pd.DataFrame(encoded_transactions, columns=my_transactionencoder.columns_)
print(encoded_transactions_df)

# our min support is 5, but it has to be expressed as a percentage for mlxtend
min_support = 1/len(course_list)

# compute the frequent itemsets using fpgriowth from mlxtend
from mlxtend.frequent_patterns.fpgrowth import fpgrowth
frequent_itemsets = fpgrowth(encoded_transactions_df, min_support=min_support, use_colnames = True)

# print the frequent itemsets
print(frequent_itemsets)

# Compute the association rules based on the frequent itemsets
from mlxtend.frequent_patterns import association_rules

# compute and print the association rules
# association_rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.1)
association_rules = association_rules(frequent_itemsets, support_only=True, min_threshold=0.1)
print(tabulate(association_rules, headers='keys', tablefmt='psql'))