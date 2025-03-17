import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { getSalesRecords, clearSalesRecords } from '@/src/database/db';
import { useFocusEffect } from 'expo-router';
import moment from 'moment'; // We no longer need moment-timezone

export default function HistoryScreen() {
    const [salesRecords, setSalesRecords] = useState<
        { item_name: string; quantity: number; created_at: string }[]
    >([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                const records = await getSalesRecords();
                setSalesRecords(records);
            };
            fetchData();
        }, [])
    );

    const handleClearHistory = async () => {
        await clearSalesRecords();
        setSalesRecords([]);
    };

    // Group sales records by date
    const groupByDate = (records: { item_name: string; quantity: number; created_at: string }[]) => {
        return records.reduce((acc, record) => {
            const date = moment(record.created_at).format('MMM DD YYYY'); // Local time zone
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(record);
            return acc;
        }, {} as { [date: string]: { item_name: string; quantity: number; created_at: string }[] });
    };

    // Sort dates from latest to oldest
    const sortedDates = Object.keys(groupByDate(salesRecords)).sort(
        (a, b) => moment(b, 'MMM DD YYYY').unix() - moment(a, 'MMM DD YYYY').unix()
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sales History</Text>

            {salesRecords.length === 0 ? (
                <Text style={styles.noRecords}>No sales records found</Text>
            ) : (
                <ScrollView>
                    {sortedDates.map((date) => (
                        <View key={date} style={styles.dateSection}>
                            <Text style={styles.dateHeader}>{date}</Text>

                            {/* Table for each date */}
                            <View style={styles.table}>
                                <View style={[styles.row, styles.headerRow]}>
                                    <Text style={[styles.cell, styles.headerCell, { flex: 3 }]}>Item Name</Text>
                                    <Text style={[styles.cell, styles.headerCell, { flex: 1 }]}>Qty</Text>
                                    <Text style={[styles.cell, styles.headerCell, { flex: 2 }]}>Time</Text>
                                </View>
                                {groupByDate(salesRecords)[date].map((item, index) => (
                                    <View key={index} style={styles.row}>
                                        <Text style={[styles.cell, { flex: 3 }]}>{item.item_name}</Text>
                                        <Text style={[styles.cell, { flex: 1 }]}>{item.quantity}</Text>
                                        <Text style={[styles.cell, { flex: 2 }]}>
                                            {moment.utc(item.created_at).local().format('hh:mm A')} {/* Local time */}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}

            {salesRecords.length > 0 && (
                <TouchableOpacity style={styles.clearButton} onPress={handleClearHistory}>
                    <Text style={styles.clearButtonText}>Clear History</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    noRecords: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'gray',
    },
    dateSection: {
        marginBottom: 20,
    },
    dateHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    table: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
    },
    headerRow: {
        backgroundColor: '#f1f1f1',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    cell: {
        paddingHorizontal: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    headerCell: {
        fontWeight: 'bold',
    },
    clearButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    clearButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
